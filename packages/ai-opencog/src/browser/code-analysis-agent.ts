// *****************************************************************************
// Copyright (C) 2024 Eclipse Foundation and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

import { injectable, inject } from '@theia/core/shared/inversify';
import { Agent } from '@theia/ai-core/lib/common/agent';
import { AgentService } from '@theia/ai-core/lib/common/agent-service';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { OpenCogService } from '../common';
import { Atom, ReasoningQuery, PatternInput, PatternResult } from '../common/opencog-types';

/**
 * OpenCog-powered code analysis agent that extends Theia's AI agent system
 */
@injectable()
export class CodeAnalysisAgent extends Agent {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService,
        @inject(WorkspaceService) private readonly workspaceService: WorkspaceService
    ) {
        super('opencog-code-analysis', 'OpenCog Code Analysis Agent', 'Cognitive code analysis using OpenCog reasoning');
    }

    async analyzeCode(fileUri: string): Promise<any> {
        try {
            // Read the file content
            const fileContent = await this.readFile(fileUri);
            
            // Use enhanced pattern recognition to analyze the code
            const patternInput: PatternInput = {
                data: fileContent,
                context: {
                    fileUri,
                    language: this.detectLanguage(fileUri),
                    timestamp: Date.now()
                },
                scope: 'project',
                options: {
                    maxResults: 20,
                    minConfidence: 0.3,
                    patternTypes: ['code', 'design-pattern', 'async-pattern', 'reactive-pattern']
                }
            };
            
            // Recognize patterns in the code
            const patterns = await this.openCogService.recognizePatterns(patternInput);
            
            // Extract code atoms based on discovered patterns
            const codeAtoms = await this.extractCodeAtomsFromPatterns(patterns, fileContent, fileUri);
            
            // Add atoms to the AtomSpace
            for (const atom of codeAtoms) {
                await this.openCogService.addAtom(atom);
            }
            
            // Perform reasoning on the code with pattern context
            const reasoningQuery: ReasoningQuery = {
                type: 'code-analysis',
                atoms: codeAtoms,
                context: {
                    fileUri,
                    language: this.detectLanguage(fileUri),
                    patterns: patterns,
                    timestamp: Date.now()
                }
            };
            
            const result = await this.openCogService.reason(reasoningQuery);
            
            return {
                fileUri,
                analysis: result,
                patterns: patterns,
                recommendations: this.generatePatternBasedRecommendations(patterns, result),
                qualityMetrics: this.calculateCodeQualityMetrics(patterns),
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('Error in code analysis:', error);
            throw error;
        }
    }

    private async readFile(fileUri: string): Promise<string> {
        // Simplified file reading - in practice would use Theia's file system services
        return `// Example code content for ${fileUri}`;
    }

    private async extractCodeAtomsFromPatterns(patterns: PatternResult[], content: string, fileUri: string): Promise<Atom[]> {
        const atoms: Atom[] = [];
        
        // Create a file atom
        atoms.push({
            type: 'FileNode',
            name: fileUri,
            truthValue: { strength: 1.0, confidence: 1.0 },
            outgoing: []
        });
        
        // Create atoms based on recognized patterns
        for (const pattern of patterns) {
            if (pattern.metadata?.patternType === 'code') {
                // Create specific atoms for code patterns
                const patternAtom: Atom = {
                    type: 'PatternNode',
                    name: `${pattern.pattern.name}_${fileUri}`,
                    truthValue: { 
                        strength: pattern.confidence, 
                        confidence: Math.min(pattern.confidence + 0.1, 1.0)
                    },
                    outgoing: [],
                    metadata: {
                        patternType: pattern.pattern.type,
                        instances: pattern.instances.length,
                        complexity: pattern.metadata.complexity
                    }
                };
                atoms.push(patternAtom);
                
                // Create atoms for each instance
                for (let i = 0; i < Math.min(pattern.instances.length, 5); i++) {
                    const instance = pattern.instances[i];
                    atoms.push({
                        type: 'InstanceNode',
                        name: `${pattern.pattern.name}_instance_${i}`,
                        truthValue: { strength: 0.8, confidence: 0.7 },
                        outgoing: [patternAtom],
                        metadata: {
                            text: instance.text,
                            index: instance.index
                        }
                    });
                }
            }
        }
        
        return atoms;
    }

    private generatePatternBasedRecommendations(patterns: PatternResult[], result: any): string[] {
        const recommendations: string[] = [];
        
        // Analyze pattern distribution
        const patternTypes = new Map<string, number>();
        patterns.forEach(pattern => {
            const type = pattern.pattern.type || 'unknown';
            patternTypes.set(type, (patternTypes.get(type) || 0) + 1);
        });
        
        // Design pattern recommendations
        const designPatterns = patterns.filter(p => p.pattern.type === 'design-pattern');
        if (designPatterns.length === 0) {
            recommendations.push('Consider implementing design patterns to improve code structure and maintainability');
        } else if (designPatterns.length > 10) {
            recommendations.push('High number of design patterns detected - ensure they are not over-engineered');
        }
        
        // Async pattern recommendations
        const asyncPatterns = patterns.filter(p => p.pattern.type === 'async-pattern');
        const promiseChains = asyncPatterns.filter(p => p.pattern.name === 'promise-chain');
        const asyncAwait = asyncPatterns.filter(p => p.pattern.name === 'async-await');
        
        if (promiseChains.length > asyncAwait.length) {
            recommendations.push('Consider migrating from Promise chains to async/await for better readability');
        }
        
        // Code complexity recommendations
        const complexPatterns = patterns.filter(p => p.metadata?.complexity === 'complex');
        if (complexPatterns.length > patterns.length * 0.3) {
            recommendations.push('High code complexity detected - consider refactoring for better maintainability');
        }
        
        // Function vs arrow function balance
        const functionDeclarations = patterns.filter(p => p.pattern.name === 'function-declaration');
        const arrowFunctions = patterns.filter(p => p.pattern.name === 'arrow-function');
        
        if (functionDeclarations.length === 0 && arrowFunctions.length > 0) {
            recommendations.push('Consider using function declarations for better hoisting and debugging');
        }
        
        return recommendations;
    }

    private calculateCodeQualityMetrics(patterns: PatternResult[]): any {
        const totalPatterns = patterns.length;
        if (totalPatterns === 0) {
            return {
                score: 0,
                patternDiversity: 0,
                averageConfidence: 0,
                designPatternUsage: 0
            };
        }
        
        const averageConfidence = patterns.reduce((sum, p) => sum + p.confidence, 0) / totalPatterns;
        
        const uniquePatternTypes = new Set(patterns.map(p => p.pattern.type || p.pattern.name));
        const patternDiversity = uniquePatternTypes.size / totalPatterns;
        
        const designPatterns = patterns.filter(p => p.pattern.type === 'design-pattern');
        const designPatternUsage = designPatterns.length / totalPatterns;
        
        // Calculate overall score
        const score = (averageConfidence * 0.4) + (patternDiversity * 0.3) + (designPatternUsage * 0.3);
        
        return {
            score: Math.round(score * 100) / 100,
            patternDiversity: Math.round(patternDiversity * 100) / 100,
            averageConfidence: Math.round(averageConfidence * 100) / 100,
            designPatternUsage: Math.round(designPatternUsage * 100) / 100,
            totalPatterns,
            uniquePatternTypes: uniquePatternTypes.size
        };
    }

    private detectLanguage(fileUri: string): string {
        const extension = fileUri.split('.').pop()?.toLowerCase();
        const languageMap: Record<string, string> = {
            'ts': 'typescript',
            'js': 'javascript',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c'
        };
        return languageMap[extension || ''] || 'unknown';
    }

    private generateRecommendations(result: any): string[] {
        // Generate recommendations based on reasoning results
        const recommendations: string[] = [];
        
        if (result.confidence < 0.5) {
            recommendations.push('Code structure could be improved for better cognitive analysis');
        }
        
        if (result.metadata?.analysisType === 'structural') {
            recommendations.push('Consider adding more semantic information to improve analysis quality');
        }
        
        return recommendations;
    }
}