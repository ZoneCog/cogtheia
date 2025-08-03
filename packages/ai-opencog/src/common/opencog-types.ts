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
    type: 'supervised' | 'unsupervised' | 'reinforcement' | 'personalization';
    input: any;
    expectedOutput?: any;
    feedback?: UserFeedback;
    context?: any;
    timestamp?: number;
}

/**
 * User feedback for learning
 */
export interface UserFeedback {
    rating: number; // 1-5 scale
    helpful: boolean;
    comment?: string;
    actionTaken?: string;
}

/**
 * Pattern recognition input
 */
export interface PatternInput {
    data: any;
    context?: any;
    scope?: 'local' | 'global' | 'project';
}

/**
 * Pattern recognition result
 */
export interface PatternResult {
    pattern: any;
    confidence: number;
    instances: any[];
    metadata?: Record<string, any>;
}