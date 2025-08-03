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

import { RpcServer } from '@theia/core/lib/common/messaging/proxy-factory';
import {
    Atom,
    AtomPattern,
    ReasoningQuery,
    ReasoningResult,
    LearningData,
    PatternInput,
    PatternResult
} from './opencog-types';

/**
 * JSON-RPC protocol extensions for OpenCog operations
 */
export interface OpenCogProtocol {
    // AtomSpace operations
    'opencog/add-atom': { atom: Atom };
    'opencog/query-atoms': { pattern: AtomPattern };
    'opencog/remove-atom': { atomId: string };
    'opencog/update-atom': { atomId: string; updates: Partial<Atom> };

    // Reasoning operations
    'opencog/reason': { query: ReasoningQuery };

    // Learning operations
    'opencog/learn': { data: LearningData };

    // Pattern recognition
    'opencog/recognize-patterns': { input: PatternInput };

    // AtomSpace management
    'opencog/get-atomspace-size': {};
    'opencog/clear-atomspace': {};
    'opencog/export-atomspace': {};
    'opencog/import-atomspace': { data: string };
}

export interface OpenCogServer extends RpcServer<OpenCogProtocol> {
}