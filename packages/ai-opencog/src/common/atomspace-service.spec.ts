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

import { expect } from 'chai';
import { Container } from '@theia/core/shared/inversify';
import { AtomSpaceService } from '../node/atomspace-service';
import { Atom } from '../common/opencog-types';

describe('AtomSpaceService', () => {
    let atomSpaceService: AtomSpaceService;

    beforeEach(() => {
        const container = new Container();
        container.bind(AtomSpaceService).toSelf().inSingletonScope();
        atomSpaceService = container.get(AtomSpaceService);
    });

    it('should add and retrieve atoms', async () => {
        const atom: Atom = {
            type: 'ConceptNode',
            name: 'test-concept',
            truthValue: { strength: 0.8, confidence: 0.9 }
        };

        const atomId = await atomSpaceService.addAtom(atom);
        expect(atomId).to.be.a('string');
        expect(atomId).to.match(/^atom_\d+$/);

        const atoms = await atomSpaceService.queryAtoms({ type: 'ConceptNode' });
        expect(atoms).to.have.length(1);
        expect(atoms[0].name).to.equal('test-concept');
        expect(atoms[0].type).to.equal('ConceptNode');
    });

    it('should perform basic reasoning', async () => {
        const result = await atomSpaceService.reason({
            type: 'code-analysis',
            context: { fileUri: 'test.ts', language: 'typescript' }
        });

        expect(result).to.have.property('confidence');
        expect(result).to.have.property('explanation');
        expect(result.confidence).to.be.a('number');
        expect(result.explanation).to.be.a('string');
    });

    it('should manage AtomSpace size', async () => {
        const initialSize = await atomSpaceService.getAtomSpaceSize();
        expect(initialSize).to.equal(0);

        await atomSpaceService.addAtom({
            type: 'TestNode',
            name: 'test1'
        });

        const sizeAfterAdd = await atomSpaceService.getAtomSpaceSize();
        expect(sizeAfterAdd).to.equal(1);

        await atomSpaceService.clearAtomSpace();
        const sizeAfterClear = await atomSpaceService.getAtomSpaceSize();
        expect(sizeAfterClear).to.equal(0);
    });

    it('should export and import AtomSpace', async () => {
        // Add some test atoms
        await atomSpaceService.addAtom({
            type: 'ConceptNode',
            name: 'concept1',
            truthValue: { strength: 0.7, confidence: 0.8 }
        });

        await atomSpaceService.addAtom({
            type: 'ConceptNode',
            name: 'concept2',
            truthValue: { strength: 0.9, confidence: 0.6 }
        });

        // Export AtomSpace
        const exportedData = await atomSpaceService.exportAtomSpace();
        expect(exportedData).to.be.a('string');

        const parsedData = JSON.parse(exportedData);
        expect(parsedData).to.be.an('array');
        expect(parsedData).to.have.length(2);

        // Clear and import
        await atomSpaceService.clearAtomSpace();
        expect(await atomSpaceService.getAtomSpaceSize()).to.equal(0);

        await atomSpaceService.importAtomSpace(exportedData);
        expect(await atomSpaceService.getAtomSpaceSize()).to.equal(2);

        // Verify imported atoms
        const atoms = await atomSpaceService.queryAtoms({ type: 'ConceptNode' });
        expect(atoms).to.have.length(2);
        
        const names = atoms.map(a => a.name);
        expect(names).to.include('concept1');
        expect(names).to.include('concept2');
    });
});