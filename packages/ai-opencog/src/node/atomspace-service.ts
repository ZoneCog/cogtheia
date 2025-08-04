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
import {
    Atom,
    AtomPattern,
    ReasoningQuery,
    ReasoningResult,
    LearningData,
    PatternInput,
    PatternResult,
    OpenCogService
} from '../common';
import { PLNReasoningEngine, PatternMatchingEngine, CodeAnalysisReasoningEngine } from './reasoning-engines';

/**
 * Enhanced AtomSpace implementation with advanced reasoning engines
 * Integrates PLN, pattern matching, and specialized code analysis
 */
@injectable()
export class AtomSpaceService implements OpenCogService {
    private atoms: Map<string, Atom> = new Map();
    private nextAtomId = 1;
    
    // Advanced reasoning engines
    private plnEngine: PLNReasoningEngine;
    private patternEngine: PatternMatchingEngine;
    private codeAnalysisEngine: CodeAnalysisReasoningEngine;

    constructor() {
        this.plnEngine = new PLNReasoningEngine();
        this.patternEngine = new PatternMatchingEngine();
        this.codeAnalysisEngine = new CodeAnalysisReasoningEngine();
    }

    async addAtom(atom: Atom): Promise<string> {
        const atomId = atom.id || this.generateAtomId();
        const atomWithId = { ...atom, id: atomId };
        this.atoms.set(atomId, atomWithId);
        return atomId;
    }

    async queryAtoms(pattern: AtomPattern): Promise<Atom[]> {
        const results: Atom[] = [];
        
        for (const atom of this.atoms.values()) {
            if (this.matchesPattern(atom, pattern)) {
                results.push(atom);
            }
        }
        
        return results;
    }

    async removeAtom(atomId: string): Promise<boolean> {
        return this.atoms.delete(atomId);
    }

    async updateAtom(atomId: string, updates: Partial<Atom>): Promise<boolean> {
        const existingAtom = this.atoms.get(atomId);
        if (!existingAtom) {
            return false;
        }
        
        const updatedAtom = { ...existingAtom, ...updates, id: atomId };
        this.atoms.set(atomId, updatedAtom);
        return true;
    }

    async reason(query: ReasoningQuery): Promise<ReasoningResult> {
        try {
            // Use specialized reasoning engines based on query type and context
            switch (query.type) {
                case 'code-analysis':
                    return await this.codeAnalysisEngine.reason(query);
                case 'code-completion':
                    return await this.performAdvancedCodeCompletion(query);
                case 'deductive':
                case 'inductive':
                case 'abductive':
                    return await this.plnEngine.reason(query);
                default:
                    return await this.performHybridReasoning(query);
            }
        } catch (error) {
            return {
                conclusion: [],
                confidence: 0,
                explanation: `Reasoning failed: ${error}`,
                metadata: { error: true, reasoningType: query.type }
            };
        }
    }

    async learn(data: LearningData): Promise<void> {
        try {
            // Enhanced learning implementation with cognitive capabilities
            const learningAtom: Atom = {
                type: 'LearningRecord',
                name: `learning_${data.type}_${Date.now()}`,
                truthValue: { strength: 0.8, confidence: 0.6 },
                metadata: {
                    learningType: data.type,
                    timestamp: data.timestamp || Date.now(),
                    feedback: data.feedback,
                    context: data.context
                }
            };
            
            await this.addAtom(learningAtom);
            
            // Apply learning to improve reasoning capabilities
            await this.updateReasoningCapabilities(data);
            
            // Store personalization data if available
            if (data.type === 'personalization' && data.feedback) {
                await this.updatePersonalizationModel(data);
            }
        } catch (error) {
            throw new Error(`Learning failed: ${error}`);
        }
    }

    async recognizePatterns(input: PatternInput): Promise<PatternResult[]> {
        try {
            // Use advanced pattern matching engine
            return await this.patternEngine.recognizePatterns(input);
        } catch (error) {
            throw new Error(`Pattern recognition failed: ${error}`);
        }
    }

    async getAtomSpaceSize(): Promise<number> {
        return this.atoms.size;
    }

    async clearAtomSpace(): Promise<void> {
        this.atoms.clear();
        this.nextAtomId = 1;
    }

    async exportAtomSpace(): Promise<string> {
        const atomsArray = Array.from(this.atoms.values());
        return JSON.stringify(atomsArray, null, 2);
    }

    async importAtomSpace(data: string): Promise<void> {
        try {
            const atomsArray: Atom[] = JSON.parse(data);
            this.atoms.clear();
            
            for (const atom of atomsArray) {
                if (atom.id) {
                    this.atoms.set(atom.id, atom);
                }
            }
        } catch (error) {
            throw new Error(`Failed to import AtomSpace: ${error}`);
        }
    }

    private generateAtomId(): string {
        return `atom_${this.nextAtomId++}`;
    }

    private matchesPattern(atom: Atom, pattern: AtomPattern): boolean {
        if (pattern.type && atom.type !== pattern.type) {
            return false;
        }
        
        if (pattern.name && atom.name !== pattern.name) {
            return false;
        }
        
        // Additional pattern matching logic would go here
        return true;
    }

    /**
     * Perform advanced code completion using cognitive reasoning
     */
    private async performAdvancedCodeCompletion(query: ReasoningQuery): Promise<ReasoningResult> {
        const context = query.context || {};
        const codeAtoms = query.atoms || [];
        
        // Analyze current code context
        const contextAnalysis = await this.analyzeCodeContext(codeAtoms, context);
        
        // Generate completion suggestions using pattern matching and PLN
        const patternSuggestions = await this.generatePatternBasedCompletions(contextAnalysis);
        const reasoningSuggestions = await this.generateReasoningBasedCompletions(contextAnalysis);
        
        // Combine and rank suggestions
        const allSuggestions = [...patternSuggestions, ...reasoningSuggestions];
        const rankedSuggestions = this.rankCompletionSuggestions(allSuggestions, context);
        
        return {
            conclusion: rankedSuggestions.slice(0, 10), // Top 10 suggestions
            confidence: this.calculateCompletionConfidence(rankedSuggestions),
            explanation: `Generated ${rankedSuggestions.length} code completion suggestions using pattern matching and cognitive reasoning`,
            metadata: {
                reasoningType: 'code-completion',
                contextType: context.language || 'unknown',
                suggestionCount: rankedSuggestions.length,
                completionStrategies: ['pattern-matching', 'cognitive-reasoning']
            }
        };
    }

    /**
     * Perform hybrid reasoning combining multiple engines
     */
    private async performHybridReasoning(query: ReasoningQuery): Promise<ReasoningResult> {
        const results: ReasoningResult[] = [];
        
        // Try PLN reasoning
        try {
            const plnResult = await this.plnEngine.reason(query);
            results.push(plnResult);
        } catch (error) {
            // Continue with other engines
        }
        
        // Try pattern matching
        try {
            const patternResult = await this.patternEngine.reason(query);
            results.push(patternResult);
        } catch (error) {
            // Continue with other engines
        }
        
        // Combine results
        return this.combineReasoningResults(results, query);
    }

    /**
     * Update reasoning capabilities based on learning data
     */
    private async updateReasoningCapabilities(data: LearningData): Promise<void> {
        if (data.feedback && data.feedback.helpful) {
            // Store successful reasoning patterns
            const successPattern: Atom = {
                type: 'SuccessPattern',
                name: `success_${data.type}_${Date.now()}`,
                truthValue: { strength: data.feedback.rating / 5, confidence: 0.8 },
                metadata: {
                    reasoningType: data.type,
                    context: data.context,
                    feedback: data.feedback
                }
            };
            await this.addAtom(successPattern);
        }
    }

    /**
     * Update personalization model
     */
    private async updatePersonalizationModel(data: LearningData): Promise<void> {
        const personalizationAtom: Atom = {
            type: 'PersonalizationNode',
            name: `personalization_${Date.now()}`,
            truthValue: { strength: 0.7, confidence: 0.6 },
            metadata: {
                userPreferences: data.input,
                feedback: data.feedback,
                timestamp: Date.now()
            }
        };
        await this.addAtom(personalizationAtom);
    }

    /**
     * Analyze code context for completion
     */
    private async analyzeCodeContext(atoms: Atom[], context: any): Promise<any> {
        return {
            language: context.language || 'unknown',
            currentScope: this.extractCurrentScope(atoms),
            availableSymbols: this.extractAvailableSymbols(atoms),
            recentPatterns: await this.getRecentPatterns(context),
            semanticContext: this.extractSemanticContext(atoms)
        };
    }

    /**
     * Generate pattern-based completions
     */
    private async generatePatternBasedCompletions(contextAnalysis: any): Promise<Atom[]> {
        const patterns = await this.recognizePatterns({
            data: contextAnalysis.availableSymbols,
            context: contextAnalysis,
            scope: 'local'
        });
        
        return patterns.map(pattern => ({
            type: 'CompletionSuggestion',
            name: `completion_pattern_${Date.now()}`,
            truthValue: { strength: pattern.confidence, confidence: 0.8 },
            metadata: {
                suggestionType: 'pattern-based',
                pattern: pattern.pattern,
                confidence: pattern.confidence
            }
        }));
    }

    /**
     * Generate reasoning-based completions
     */
    private async generateReasoningBasedCompletions(contextAnalysis: any): Promise<Atom[]> {
        const reasoningQuery: ReasoningQuery = {
            type: 'deductive',
            atoms: contextAnalysis.availableSymbols,
            context: contextAnalysis
        };
        
        const result = await this.plnEngine.reason(reasoningQuery);
        
        return result.conclusion.map(atom => ({
            type: 'CompletionSuggestion',
            name: `completion_reasoning_${Date.now()}`,
            truthValue: { strength: result.confidence, confidence: 0.7 },
            metadata: {
                suggestionType: 'reasoning-based',
                reasoning: result.explanation,
                confidence: result.confidence
            }
        }));
    }

    /**
     * Rank completion suggestions
     */
    private rankCompletionSuggestions(suggestions: Atom[], context: any): Atom[] {
        return suggestions.sort((a, b) => {
            const scoreA = this.calculateSuggestionScore(a, context);
            const scoreB = this.calculateSuggestionScore(b, context);
            return scoreB - scoreA;
        });
    }

    /**
     * Calculate suggestion score
     */
    private calculateSuggestionScore(suggestion: Atom, context: any): number {
        const baseScore = suggestion.truthValue?.strength || 0.5;
        const confidenceBonus = (suggestion.truthValue?.confidence || 0.5) * 0.3;
        const contextBonus = this.calculateContextRelevance(suggestion, context) * 0.2;
        
        return baseScore + confidenceBonus + contextBonus;
    }

    /**
     * Calculate context relevance
     */
    private calculateContextRelevance(suggestion: Atom, context: any): number {
        // Simple relevance calculation based on metadata
        const suggestionType = suggestion.metadata?.suggestionType;
        if (suggestionType === 'pattern-based' && context.preferPatterns) {
            return 1.0;
        }
        if (suggestionType === 'reasoning-based' && context.preferReasoning) {
            return 1.0;
        }
        return 0.5;
    }

    /**
     * Calculate completion confidence
     */
    private calculateCompletionConfidence(suggestions: Atom[]): number {
        if (suggestions.length === 0) return 0;
        
        const avgConfidence = suggestions.reduce((sum, suggestion) => 
            sum + (suggestion.truthValue?.confidence || 0), 0
        ) / suggestions.length;
        
        return Math.min(0.9, avgConfidence * 0.9);
    }

    /**
     * Combine multiple reasoning results
     */
    private combineReasoningResults(results: ReasoningResult[], query: ReasoningQuery): ReasoningResult {
        if (results.length === 0) {
            return {
                conclusion: [],
                confidence: 0,
                explanation: 'No reasoning engines provided results'
            };
        }
        
        const allConclusions: Atom[] = [];
        let totalConfidence = 0;
        const explanations: string[] = [];
        
        for (const result of results) {
            allConclusions.push(...result.conclusion);
            totalConfidence += result.confidence;
            explanations.push(result.explanation || '');
        }
        
        return {
            conclusion: allConclusions,
            confidence: totalConfidence / results.length,
            explanation: `Hybrid reasoning (${results.length} engines): ${explanations.join('; ')}`,
            metadata: {
                reasoningType: 'hybrid',
                engineCount: results.length,
                originalQuery: query.type
            }
        };
    }

    /**
     * Helper methods for context analysis
     */
    private extractCurrentScope(atoms: Atom[]): any {
        return { type: 'function', name: 'current_function' };
    }

    private extractAvailableSymbols(atoms: Atom[]): Atom[] {
        return atoms.filter(atom => 
            atom.type === 'VariableNode' || 
            atom.type === 'FunctionNode' ||
            atom.type === 'ConceptNode'
        );
    }

    private async getRecentPatterns(context: any): Promise<any[]> {
        const recentPatterns = await this.queryAtoms({ type: 'PatternNode' });
        return recentPatterns.slice(-10); // Last 10 patterns
    }

    private extractSemanticContext(atoms: Atom[]): any {
        const concepts = atoms.filter(atom => atom.type === 'ConceptNode');
        return {
            dominantConcepts: concepts.slice(0, 5),
            conceptCount: concepts.length
        };
    }
}