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

import {
    Atom,
    AtomPattern,
    ReasoningQuery,
    ReasoningResult,
    LearningData,
    PatternInput,
    PatternResult,
    LearningModel,
    AdaptationStrategy,
    UserBehaviorPattern,
    LearningContext,
    UserFeedback
} from './opencog-types';
import { KnowledgeManagementService } from './knowledge-management-service';

export const OPENCOG_SERVICE_PATH = '/services/opencog';

/**
 * Core OpenCog service interface for Theia integration
 * Enhanced with knowledge management capabilities
 */
export interface OpenCogService {
    /**
     * AtomSpace operations
     */
    addAtom(atom: Atom): Promise<string>;
    queryAtoms(pattern: AtomPattern): Promise<Atom[]>;
    removeAtom(atomId: string): Promise<boolean>;
    updateAtom(atomId: string, updates: Partial<Atom>): Promise<boolean>;

    /**
     * Reasoning operations
     */
    reason(query: ReasoningQuery): Promise<ReasoningResult>;

    /**
     * Learning operations
     */
    learn(data: LearningData): Promise<void>;

    /**
     * Advanced learning and adaptation methods
     */
    learnFromFeedback(feedback: UserFeedback, context: LearningContext): Promise<void>;
    adaptToUser(userId: string, domain: string, data: any): Promise<AdaptationStrategy>;
    getAdaptationStrategy(userId: string, domain: string): Promise<AdaptationStrategy | undefined>;
    
    /**
     * Behavioral learning
     */
    learnUserBehavior(userId: string, action: string, context: any): Promise<void>;
    getUserBehaviorPatterns(userId: string): Promise<UserBehaviorPattern[]>;
    predictUserAction(userId: string, context: any): Promise<{ action: string; confidence: number }[]>;
    
    /**
     * Learning model management
     */
    createLearningModel(type: string, parameters?: Record<string, any>): Promise<LearningModel>;
    updateLearningModel(modelId: string, trainingData: LearningData[]): Promise<LearningModel>;
    getLearningModel(modelId: string): Promise<LearningModel | undefined>;
    listLearningModels(): Promise<LearningModel[]>;
    
    /**
     * Personalization
     */
    personalize(userId: string, preferences: Record<string, any>): Promise<void>;
    getPersonalization(userId: string): Promise<Record<string, any>>;
    
    /**
     * Learning analytics
     */
    getLearningStats(): Promise<{
        totalLearningRecords: number;
        modelAccuracy: Record<string, number>;
        userAdaptations: number;
        behaviorPatterns: number;
    }>;

    /**
     * Pattern recognition
     */
    recognizePatterns(input: PatternInput): Promise<PatternResult[]>;

    /**
     * AtomSpace statistics and management
     */
    getAtomSpaceSize(): Promise<number>;
    clearAtomSpace(): Promise<void>;
    exportAtomSpace(): Promise<string>;
    importAtomSpace(data: string): Promise<void>;

    /**
     * Knowledge Management Service integration
     */
    getKnowledgeManagementService(): KnowledgeManagementService;
}

export const OpenCogService = 'OpenCogService';