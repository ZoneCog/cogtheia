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
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging';
import {
    Atom,
    AtomPattern,
    ReasoningQuery,
    ReasoningResult,
    LearningData,
    PatternInput,
    PatternResult,
    OpenCogService,
    OPENCOG_SERVICE_PATH
} from '../common';

/**
 * Frontend OpenCog service that communicates with the backend via RPC
 */
@injectable()
export class FrontendOpenCogService implements OpenCogService {

    private readonly openCogService: OpenCogService;

    constructor(
        @inject(WebSocketConnectionProvider) protected readonly connectionProvider: WebSocketConnectionProvider
    ) {
        this.openCogService = this.connectionProvider.createProxy<OpenCogService>(OPENCOG_SERVICE_PATH);
    }

    async addAtom(atom: Atom): Promise<string> {
        return this.openCogService.addAtom(atom);
    }

    async queryAtoms(pattern: AtomPattern): Promise<Atom[]> {
        return this.openCogService.queryAtoms(pattern);
    }

    async removeAtom(atomId: string): Promise<boolean> {
        return this.openCogService.removeAtom(atomId);
    }

    async updateAtom(atomId: string, updates: Partial<Atom>): Promise<boolean> {
        return this.openCogService.updateAtom(atomId, updates);
    }

    async reason(query: ReasoningQuery): Promise<ReasoningResult> {
        return this.openCogService.reason(query);
    }

    async learn(data: LearningData): Promise<void> {
        return this.openCogService.learn(data);
    }

    async recognizePatterns(input: PatternInput): Promise<PatternResult[]> {
        return this.openCogService.recognizePatterns(input);
    }

    async getAtomSpaceSize(): Promise<number> {
        return this.openCogService.getAtomSpaceSize();
    }

    async clearAtomSpace(): Promise<void> {
        return this.openCogService.clearAtomSpace();
    }

    async exportAtomSpace(): Promise<string> {
        return this.openCogService.exportAtomSpace();
    }

    async importAtomSpace(data: string): Promise<void> {
        return this.openCogService.importAtomSpace(data);
    }
}