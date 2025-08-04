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
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging';
import { AgentService } from '@theia/ai-core/lib/common/agent-service';
import { OpenCogService, OPENCOG_SERVICE_PATH } from '../common';
import { FrontendOpenCogService } from './frontend-opencog-service';
import { CodeAnalysisAgent } from './code-analysis-agent';
import { LearningAdaptationAgent } from './learning-adaptation-agent';

export default new ContainerModule(bind => {
    // Bind the frontend OpenCog service
    bind(OpenCogService).to(FrontendOpenCogService).inSingletonScope();
    
    // Bind the agents
    bind(CodeAnalysisAgent).toSelf().inSingletonScope();
    bind(LearningAdaptationAgent).toSelf().inSingletonScope();
    
    // Register the agents with the agent service
    bind(Symbol.for('Agent')).to(CodeAnalysisAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(LearningAdaptationAgent).inSingletonScope();
});