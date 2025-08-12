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
import { 
    OpenCogService,
    KnowledgeManagementService,
    DeductiveReasoningService,
    InductiveReasoningService,
    AbductiveReasoningService,
    SupervisedLearningService,
    UnsupervisedLearningService,
    ReinforcementLearningService
} from '../common';
import { FrontendOpenCogService } from './frontend-opencog-service';
import { FrontendKnowledgeManagementService } from './frontend-knowledge-management-service';
import { CodeAnalysisAgent } from './code-analysis-agent';
import { LearningAdaptationAgent } from './learning-adaptation-agent';
// Phase 2 cognitive services
import { PatternRecognitionAgent } from './pattern-recognition-agent';
import { LearningAgent } from './enhanced-learning-agent';
import { SemanticCompletionProvider } from './semantic-completion';
import { IntelligentRefactoringProvider } from './intelligent-refactoring';
import { RealTimeCodeAnalyzer } from './real-time-analyzer';
import { CognitiveEditorIntegration } from './cognitive-editor-integration';
// Phase 3 AI Agent Enhancement - Cognitive Code Analysis Agents
import { ComprehensiveCodeAnalysisAgent } from './comprehensive-code-analysis-agent';
import { IntelligentAssistanceAgent } from './intelligent-assistance-agent';
import { AdvancedReasoningAgent } from './advanced-reasoning-agent';
import { UserBehaviorLearningAgent } from './user-behavior-learning-agent';
import { UserBehaviorMonitorService } from './user-behavior-monitor-service';
import { SpecializedProblemSolvingAgent } from './specialized-problem-solving-agent';
// Phase 3 frontend services
import { 
    FrontendDeductiveReasoningService,
    FrontendInductiveReasoningService,
    FrontendAbductiveReasoningService
} from './frontend-reasoning-services';
import {
    FrontendSupervisedLearningService,
    FrontendUnsupervisedLearningService,
    FrontendReinforcementLearningService
} from './frontend-learning-services';
// Phase 4 sensor-motor system
import { CodeChangeSensor } from './code-change-sensor';
import { ActivitySensor } from './activity-sensor';
import { EnvironmentSensor } from './environment-sensor';
import { CodeModificationActuator } from './code-modification-actuator';
import { ToolControlActuator } from './tool-control-actuator';
import { EnvironmentManagementActuator } from './environment-management-actuator';
import { SensorMotorService } from './sensor-motor-service';

export default new ContainerModule(bind => {
    // Bind the frontend OpenCog service
    bind(OpenCogService).to(FrontendOpenCogService).inSingletonScope();
    
    // Bind the frontend Knowledge Management service
    bind(KnowledgeManagementService).to(FrontendKnowledgeManagementService).inSingletonScope();
    
    // Phase 3: Bind frontend reasoning services
    bind(DeductiveReasoningService).to(FrontendDeductiveReasoningService).inSingletonScope();
    bind(InductiveReasoningService).to(FrontendInductiveReasoningService).inSingletonScope();
    bind(AbductiveReasoningService).to(FrontendAbductiveReasoningService).inSingletonScope();
    
    // Phase 3: Bind frontend learning services
    bind(SupervisedLearningService).to(FrontendSupervisedLearningService).inSingletonScope();
    bind(UnsupervisedLearningService).to(FrontendUnsupervisedLearningService).inSingletonScope();
    bind(ReinforcementLearningService).to(FrontendReinforcementLearningService).inSingletonScope();
    
    // Bind the existing agents
    bind(CodeAnalysisAgent).toSelf().inSingletonScope();
    bind(LearningAdaptationAgent).toSelf().inSingletonScope();
    
    // Bind Phase 2 cognitive services
    bind(PatternRecognitionAgent).toSelf().inSingletonScope();
    bind(LearningAgent).toSelf().inSingletonScope();
    bind(SemanticCompletionProvider).toSelf().inSingletonScope();
    bind(IntelligentRefactoringProvider).toSelf().inSingletonScope();
    bind(RealTimeCodeAnalyzer).toSelf().inSingletonScope();
    
    // Bind Phase 3 AI Agent Enhancement - Cognitive Code Analysis Agents
    bind(ComprehensiveCodeAnalysisAgent).toSelf().inSingletonScope();
    bind(IntelligentAssistanceAgent).toSelf().inSingletonScope();
    bind(AdvancedReasoningAgent).toSelf().inSingletonScope();
    bind(UserBehaviorLearningAgent).toSelf().inSingletonScope();
    bind(SpecializedProblemSolvingAgent).toSelf().inSingletonScope();
    
    // Bind user behavior monitoring service
    bind(UserBehaviorMonitorService).to(UserBehaviorMonitorService).inSingletonScope();
    
    // Bind editor integration
    bind(CognitiveEditorIntegration).toSelf().inSingletonScope();
    
    // Register the agents with the agent service
    bind(Symbol.for('Agent')).to(CodeAnalysisAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(LearningAdaptationAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(PatternRecognitionAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(LearningAgent).inSingletonScope();
    
    // Register Phase 3 agents with the agent service
    bind(Symbol.for('Agent')).to(ComprehensiveCodeAnalysisAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(IntelligentAssistanceAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(AdvancedReasoningAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(UserBehaviorLearningAgent).inSingletonScope();
    bind(Symbol.for('Agent')).to(SpecializedProblemSolvingAgent).inSingletonScope();

    // Phase 4: Bind sensor-motor system components
    bind(CodeChangeSensor).toSelf().inSingletonScope();
    bind(ActivitySensor).toSelf().inSingletonScope();
    bind(EnvironmentSensor).toSelf().inSingletonScope();
    bind(CodeModificationActuator).toSelf().inSingletonScope();
    bind(ToolControlActuator).toSelf().inSingletonScope();
    bind(EnvironmentManagementActuator).toSelf().inSingletonScope();
    bind(SensorMotorService).toSelf().inSingletonScope();
});