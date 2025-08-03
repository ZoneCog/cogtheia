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
    PatternResult
} from './opencog-types';

export const OPENCOG_SERVICE_PATH = '/services/opencog';

/**
 * Core OpenCog service interface for Theia integration
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
}

export const OpenCogService = Symbol('OpenCogService');