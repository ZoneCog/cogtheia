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

import { ContainerModule } from '@theia/core/shared/inversify';
import { ConnectionHandler, RpcConnectionHandler } from '@theia/core/lib/common/messaging';
import { 
    OpenCogService, 
    OPENCOG_SERVICE_PATH,
    KnowledgeManagementService,
    KNOWLEDGE_MANAGEMENT_SERVICE_PATH
} from '../common';
import { AtomSpaceService } from './atomspace-service';
import { KnowledgeManagementServiceImpl } from './knowledge-management-service-impl';
// Phase 2 backend components
import { CodeAnalysisAgent } from './code-analysis-agent';

export default new ContainerModule(bind => {
    bind(OpenCogService).to(AtomSpaceService).inSingletonScope();
    bind(KnowledgeManagementService).to(KnowledgeManagementServiceImpl).inSingletonScope();
    
    // Phase 2: Bind node-based code analysis agent
    bind(CodeAnalysisAgent).toSelf().inSingletonScope();
    bind(Symbol.for('Agent')).to(CodeAnalysisAgent).inSingletonScope();
    
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler(OPENCOG_SERVICE_PATH, () =>
            ctx.container.get(OpenCogService)
        )
    ).inSingletonScope();

    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler(KNOWLEDGE_MANAGEMENT_SERVICE_PATH, () =>
            ctx.container.get(KnowledgeManagementService)
        )
    ).inSingletonScope();
});