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

/**
 * Represents an atom in the OpenCog AtomSpace
 */
export interface Atom {
    id?: string;
    type: string;
    name?: string;
    truthValue?: TruthValue;
    attentionValue?: AttentionValue;
    incoming?: Atom[];
    outgoing?: Atom[];
    metadata?: Record<string, any>;
}

/**
 * Truth value for OpenCog atoms
 */
export interface TruthValue {
    strength: number;
    confidence: number;
}

/**
 * Attention value for OpenCog atoms
 */
export interface AttentionValue {
    sti: number; // Short-term importance
    lti: number; // Long-term importance
    vlti: number; // Very long-term importance
}

/**
 * Pattern for querying atoms in the AtomSpace
 */
export interface AtomPattern {
    type?: string;
    name?: string;
    truthValueThreshold?: TruthValue;
    attentionThreshold?: AttentionValue;
    bindVariables?: Record<string, any>;
}

/**
 * Reasoning query structure
 */
export interface ReasoningQuery {
    type: 'deductive' | 'inductive' | 'abductive' | 'code-analysis' | 'code-completion';
    atoms?: Atom[];
    context?: any;
    parameters?: Record<string, any>;
}

/**
 * Result from reasoning operations
 */
export interface ReasoningResult {
    conclusion?: Atom[];
    confidence: number;
    explanation?: string;
    metadata?: Record<string, any>;
}

/**
 * Learning data input
 */
export interface LearningData {
    type: 'supervised' | 'unsupervised' | 'reinforcement' | 'personalization' | 'behavioral' | 'adaptive';
    input: any;
    expectedOutput?: any;
    feedback?: UserFeedback;
    context?: LearningContext;
    timestamp?: number;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    sessionId?: string;
}

/**
 * Learning context for better adaptation
 */
export interface LearningContext {
    userId?: string;
    workspaceId?: string;
    projectType?: string;
    currentTask?: string;
    userExperience?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    preferences?: Record<string, any>;
    environmentInfo?: Record<string, any>;
}

/**
 * User feedback for learning
 */
export interface UserFeedback {
    rating: number; // 1-5 scale
    helpful: boolean;
    comment?: string;
    actionTaken?: string;
    timeSpent?: number; // Time spent with suggestion in seconds
    outcome?: 'accepted' | 'rejected' | 'modified' | 'ignored';
}

/**
 * Learning model for storing learned patterns
 */
export interface LearningModel {
    id: string;
    type: string;
    version: number;
    accuracy?: number;
    confidence?: number;
    trainingData?: LearningData[];
    parameters?: Record<string, any>;
    createdAt: number;
    updatedAt: number;
}

/**
 * Adaptation strategy for personalization
 */
export interface AdaptationStrategy {
    id: string;
    userId: string;
    domain: string; // e.g., 'code_completion', 'debugging', 'navigation'
    strategy: Record<string, any>;
    effectiveness: number; // 0-1 scale
    lastUpdated: number;
}

/**
 * User behavior pattern
 */
export interface UserBehaviorPattern {
    id: string;
    userId: string;
    pattern: string;
    frequency: number;
    context: Record<string, any>;
    confidence: number;
    discovered: number;
    lastSeen: number;
}

/**
 * Pattern recognition input
 */
export interface PatternInput {
    data: any;
    context?: any;
    scope?: 'local' | 'global' | 'project';
    options?: PatternRecognitionOptions;
}

/**
 * Options for pattern recognition
 */
export interface PatternRecognitionOptions {
    /** Maximum number of patterns to return */
    maxResults?: number;
    /** Minimum confidence threshold */
    minConfidence?: number;
    /** Specific pattern types to look for */
    patternTypes?: PatternType[];
    /** Whether to include low-confidence patterns */
    includeLowConfidence?: boolean;
}

/**
 * Types of patterns that can be recognized
 */
export type PatternType = 
    | 'code' 
    | 'structural' 
    | 'behavioral' 
    | 'syntax-pattern'
    | 'design-pattern'
    | 'async-pattern'
    | 'reactive-pattern'
    | 'sequence'
    | 'repetition'
    | 'hierarchical'
    | 'interaction-rhythm'
    | 'usage-profile'
    | 'sequential'
    | 'semantic';

/**
 * Pattern recognition result
 */
export interface PatternResult {
    pattern: any;
    confidence: number;
    instances: any[];
    metadata?: PatternMetadata;
}

/**
 * Metadata for pattern results
 */
export interface PatternMetadata {
    patternType?: PatternType;
    timestamp?: number;
    language?: string;
    complexity?: 'simple' | 'moderate' | 'complex';
    frequency?: number;
    depth?: number;
    timespan?: number;
    efficiency?: number;
    variability?: number;
    consistency?: number;
    [key: string]: any;
}