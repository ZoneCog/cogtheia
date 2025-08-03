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
import { Atom, ReasoningQuery } from '../common/opencog-types';

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
            
            // Extract code atoms (simplified for demonstration)
            const codeAtoms = await this.extractCodeAtoms(fileContent, fileUri);
            
            // Add atoms to the AtomSpace
            for (const atom of codeAtoms) {
                await this.openCogService.addAtom(atom);
            }
            
            // Perform reasoning on the code
            const reasoningQuery: ReasoningQuery = {
                type: 'code-analysis',
                atoms: codeAtoms,
                context: {
                    fileUri,
                    language: this.detectLanguage(fileUri),
                    timestamp: Date.now()
                }
            };
            
            const result = await this.openCogService.reason(reasoningQuery);
            
            return {
                fileUri,
                analysis: result,
                recommendations: this.generateRecommendations(result),
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

    private async extractCodeAtoms(content: string, fileUri: string): Promise<Atom[]> {
        // Simplified code atom extraction - would be much more sophisticated in practice
        const atoms: Atom[] = [];
        
        // Create a file atom
        atoms.push({
            type: 'FileNode',
            name: fileUri,
            truthValue: { strength: 1.0, confidence: 1.0 },
            outgoing: []
        });
        
        // Extract basic patterns (functions, classes, etc.)
        const functionMatches = content.match(/function\s+(\w+)/g) || [];
        for (const match of functionMatches) {
            const functionName = match.replace('function ', '');
            atoms.push({
                type: 'FunctionNode',
                name: functionName,
                truthValue: { strength: 0.9, confidence: 0.8 },
                outgoing: []
            });
        }
        
        return atoms;
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