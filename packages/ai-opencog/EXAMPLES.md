# Usage Examples

This file demonstrates usage of the @theia/ai-opencog package, including the enhanced learning and adaptation systems.

## Basic AtomSpace Operations

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { OpenCogService } from '@theia/ai-opencog/lib/common';

@injectable()
export class ExampleOpenCogUsage {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async demonstrateBasicOperations(): Promise<void> {
        // 1. Add atoms to the AtomSpace
        const conceptId = await this.openCogService.addAtom({
            type: 'ConceptNode',
            name: 'my-concept',
            truthValue: { strength: 0.8, confidence: 0.9 }
        });

        const relationId = await this.openCogService.addAtom({
            type: 'InheritanceLink',
            outgoing: [
                { type: 'ConceptNode', name: 'child-concept' },
                { type: 'ConceptNode', name: 'parent-concept' }
            ],
            truthValue: { strength: 0.9, confidence: 0.8 }
        });

        // 2. Query atoms
        const concepts = await this.openCogService.queryAtoms({
            type: 'ConceptNode'
        });
        console.log(`Found ${concepts.length} concept nodes`);

        // 3. Perform reasoning
        const reasoningResult = await this.openCogService.reason({
            type: 'deductive',
            atoms: concepts,
            context: { domain: 'software-engineering' }
        });
        console.log(`Reasoning confidence: ${reasoningResult.confidence}`);
    }
}
```

## Enhanced Learning and Adaptation Examples

### 1. Learning from User Feedback

```typescript
import { LearningAdaptationAgent } from '@theia/ai-opencog/lib/browser/learning-adaptation-agent';
import { UserFeedback, LearningContext } from '@theia/ai-opencog/lib/common';

@injectable()
export class FeedbackLearningExample {
    constructor(
        @inject(LearningAdaptationAgent) private readonly learningAgent: LearningAdaptationAgent
    ) {}

    async handleUserFeedback(): Promise<void> {
        const suggestion = {
            type: 'code_completion',
            content: 'console.log("Hello World");',
            location: { line: 10, column: 5 }
        };

        const feedback: UserFeedback = {
            rating: 5,
            helpful: true,
            comment: 'Perfect suggestion!',
            outcome: 'accepted',
            timeSpent: 15
        };

        const context = {
            task: 'javascript_development',
            userExperience: 'intermediate',
            preferences: { verboseLogging: false }
        };

        await this.learningAgent.learnFromFeedback('user123', suggestion, feedback, context);
    }
}
```

### 2. Behavioral Learning and Adaptation

```typescript
@injectable()
export class BehavioralLearningExample {
    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService,
        @inject(LearningAdaptationAgent) private readonly learningAgent: LearningAdaptationAgent
    ) {}

    async learnUserBehavior(): Promise<void> {
        const userId = 'user123';
        
        // Learn from various user actions
        await this.learningAgent.learnUserBehavior(userId, 'open_file', {
            fileType: 'typescript',
            projectType: 'web_app',
            timeOfDay: 'morning'
        });

        await this.learningAgent.learnUserBehavior(userId, 'run_tests', {
            testFramework: 'jest',
            projectType: 'web_app',
            timeOfDay: 'morning'
        });

        // Get behavior patterns
        const patterns = await this.openCogService.getUserBehaviorPatterns(userId);
        console.log(`User has ${patterns.length} behavior patterns`);

        // Predict next action
        const predictions = await this.openCogService.predictUserAction(userId, {
            projectType: 'web_app',
            timeOfDay: 'morning'
        });
        
        console.log('Predicted actions:', predictions);
    }
}
```

### 3. Personalization System

```typescript
@injectable()
export class PersonalizationExample {
    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async setupPersonalization(): Promise<void> {
        const userId = 'user123';
        
        // Set user preferences
        await this.openCogService.personalize(userId, {
            theme: 'dark',
            fontSize: 14,
            preferredLanguage: 'typescript',
            showLineNumbers: true,
            autoSave: false,
            maxSuggestions: 8
        });

        // Adapt IDE behavior for code completion
        await this.openCogService.adaptToUser(userId, 'code_completion', {
            currentProject: 'web_application',
            recentFiles: ['app.ts', 'utils.ts'],
            preferredPatterns: ['functional', 'async_await']
        });

        // Get personalized settings
        const personalization = await this.openCogService.getPersonalization(userId);
        console.log('User preferences:', personalization);

        // Get adaptation strategy
        const strategy = await this.openCogService.getAdaptationStrategy(userId, 'code_completion');
        console.log('Adaptation strategy:', strategy);
    }
}
```

### 4. Learning Model Management

```typescript
@injectable()
export class LearningModelExample {
    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async manageLearningModels(): Promise<void> {
        // Create a learning model for code completion
        const model = await this.openCogService.createLearningModel('code_completion', {
            algorithm: 'neural_network',
            layers: [256, 128, 64],
            learningRate: 0.001,
            domain: 'javascript'
        });

        console.log(`Created model: ${model.id}`);

        // Train the model with user data
        const trainingData = [
            {
                type: 'supervised' as const,
                input: { context: 'function getName() {', cursor: 20 },
                expectedOutput: { suggestion: 'return this.name;' },
                feedback: { rating: 5, helpful: true, outcome: 'accepted' as const },
                timestamp: Date.now()
            },
            {
                type: 'supervised' as const,
                input: { context: 'const user = new User();', cursor: 23 },
                expectedOutput: { suggestion: 'user.setName("John");' },
                feedback: { rating: 4, helpful: true, outcome: 'accepted' as const },
                timestamp: Date.now()
            }
        ];

        const updatedModel = await this.openCogService.updateLearningModel(model.id, trainingData);
        console.log(`Model accuracy: ${updatedModel.accuracy}`);

        // List all models
        const allModels = await this.openCogService.listLearningModels();
        console.log(`Total models: ${allModels.length}`);
    }
}
```

### 5. Code Editing Pattern Learning

```typescript
@injectable()
export class CodeEditingLearningExample {
    constructor(
        @inject(LearningAdaptationAgent) private readonly learningAgent: LearningAdaptationAgent
    ) {}

    async learnFromCodeEditing(): Promise<void> {
        const userId = 'user123';

        // Learn from different types of code edits
        await this.learningAgent.learnCodeEditingPatterns(userId, {
            type: 'insert',
            content: 'console.log("Debug:", variable);',
            location: { line: 25, column: 0 },
            fileType: 'typescript'
        }, {
            debuggingSession: true,
            timeOfDay: 'afternoon',
            complexity: 'medium'
        });

        await this.learningAgent.learnCodeEditingPatterns(userId, {
            type: 'replace',
            content: 'const result = await fetchData();',
            location: { line: 15, column: 8 },
            fileType: 'typescript'
        }, {
            refactoringSession: true,
            pattern: 'async_await_conversion'
        });
    }
}
```

### 6. Debugging Session Learning

```typescript
@injectable()
export class DebuggingLearningExample {
    constructor(
        @inject(LearningAdaptationAgent) private readonly learningAgent: LearningAdaptationAgent
    ) {}

    async learnFromDebugging(): Promise<void> {
        const userId = 'user123';

        // Learn from successful debugging session
        await this.learningAgent.learnDebuggingPatterns(userId, {
            issueType: 'null_pointer_exception',
            resolution: 'added_null_check',
            timeSpent: 300, // 5 minutes
            successful: true
        }, {
            language: 'typescript',
            framework: 'react',
            complexity: 'medium'
        });

        // Learn from unsuccessful debugging session
        await this.learningAgent.learnDebuggingPatterns(userId, {
            issueType: 'performance_issue',
            resolution: 'attempted_caching',
            timeSpent: 1800, // 30 minutes
            successful: false
        }, {
            language: 'typescript',
            framework: 'node_express',
            complexity: 'high'
        });
    }
}
```

### 7. Getting Personalized Recommendations

```typescript
@injectable()
export class RecommendationExample {
    constructor(
        @inject(LearningAdaptationAgent) private readonly learningAgent: LearningAdaptationAgent
    ) {}

    async getRecommendations(): Promise<void> {
        const userId = 'user123';
        const context = {
            currentFile: 'src/components/UserProfile.tsx',
            projectType: 'react_application',
            timeOfDay: 'morning',
            recentActions: ['opened_file', 'ran_tests']
        };

        const recommendations = await this.learningAgent.getPersonalizedRecommendations(userId, context);
        
        console.log('Personalized recommendations:');
        recommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec.type}: ${rec.suggestion || rec.action}`);
            console.log(`   Confidence: ${rec.confidence}`);
            console.log(`   Reason: ${rec.reason}`);
        });
    }
}
```

### 8. Learning Analytics and Statistics

```typescript
@injectable()
export class AnalyticsExample {
    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async getLearningAnalytics(): Promise<void> {
        const stats = await this.openCogService.getLearningStats();
        
        console.log('=== Learning Analytics ===');
        console.log(`Total Learning Records: ${stats.totalLearningRecords}`);
        console.log(`User Adaptations: ${stats.userAdaptations}`);
        console.log(`Behavior Patterns: ${stats.behaviorPatterns}`);
        
        console.log('\nModel Accuracy:');
        Object.entries(stats.modelAccuracy).forEach(([modelId, accuracy]) => {
            console.log(`  ${modelId}: ${(accuracy * 100).toFixed(2)}%`);
        });
    }
}
```

### 9. Continuous Learning Setup

```typescript
@injectable()
export class ContinuousLearningExample {
    constructor(
        @inject(LearningAdaptationAgent) private readonly learningAgent: LearningAdaptationAgent,
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async setupContinuousLearning(): Promise<void> {
        const userId = 'user123';
        
        // Start continuous learning session
        await this.learningAgent.startContinuousLearning(userId);
        
        // Simulate various learning events throughout the session
        await this.simulateUserSession(userId);
        
        // Get final analytics
        const stats = await this.openCogService.getLearningStats();
        console.log('Session learning stats:', stats);
    }

    private async simulateUserSession(userId: string): Promise<void> {
        // Simulate file operations
        await this.learningAgent.learnUserBehavior(userId, 'open_file', {
            fileType: 'typescript',
            size: 'medium'
        });

        // Simulate code completion usage
        await this.openCogService.learn({
            type: 'behavioral',
            input: { action: 'accept_suggestion', suggestionType: 'method_call' },
            context: { userId, currentTask: 'coding' },
            timestamp: Date.now()
        });

        // Simulate debugging
        await this.learningAgent.learnDebuggingPatterns(userId, {
            issueType: 'syntax_error',
            resolution: 'missing_semicolon',
            timeSpent: 60,
            successful: true
        }, {
            language: 'typescript',
            ide_feature: 'error_highlighting'
        });
    }
}
            type: 'supervised',
            input: { codeSnippet: 'function example() {}' },
            feedback: {
                rating: 4,
                helpful: true,
                comment: 'Good example'
            }
        });

        // 5. Pattern recognition
        const patterns = await this.openCogService.recognizePatterns({
            data: { sourceCode: 'class MyClass { ... }' },
            context: { language: 'typescript' }
        });
        console.log(`Found ${patterns.length} patterns`);
    }
}
```

## Code Analysis Agent Usage

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { CodeAnalysisAgent } from '@theia/ai-opencog/lib/browser';

@injectable()
export class ExampleCodeAnalysis {

    constructor(
        @inject(CodeAnalysisAgent) private readonly codeAnalysisAgent: CodeAnalysisAgent
    ) {}

    async analyzeFile(fileUri: string): Promise<void> {
        try {
            const analysis = await this.codeAnalysisAgent.analyzeCode(fileUri);
            
            console.log(`Analysis for ${analysis.fileUri}:`);
            console.log(`Confidence: ${analysis.analysis.confidence}`);
            console.log(`Recommendations:`);
            
            for (const recommendation of analysis.recommendations) {
                console.log(`- ${recommendation}`);
            }
            
        } catch (error) {
            console.error('Code analysis failed:', error);
        }
    }
}
```

## Integration with Theia Commands

```typescript
import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { OpenCogService } from '@theia/ai-opencog/lib/common';

export namespace OpenCogCommands {
    export const ANALYZE_WORKSPACE: Command = {
        id: 'opencog.analyze.workspace',
        label: 'OpenCog: Analyze Workspace'
    };
    
    export const SHOW_ATOMSPACE_STATS: Command = {
        id: 'opencog.atomspace.stats',
        label: 'OpenCog: Show AtomSpace Statistics'
    };
}

@injectable()
export class OpenCogCommandContribution implements CommandContribution {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(OpenCogCommands.ANALYZE_WORKSPACE, {
            execute: async () => {
                // Perform workspace-wide cognitive analysis
                const result = await this.openCogService.reason({
                    type: 'code-analysis',
                    context: { scope: 'workspace' }
                });
                
                console.log('Workspace analysis completed:', result);
            }
        });

        commands.registerCommand(OpenCogCommands.SHOW_ATOMSPACE_STATS, {
            execute: async () => {
                const size = await this.openCogService.getAtomSpaceSize();
                console.log(`AtomSpace contains ${size} atoms`);
            }
        });
    }
}
```

## Advanced Reasoning Example

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { OpenCogService } from '@theia/ai-opencog/lib/common';

@injectable()
export class AdvancedReasoningExample {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async performMultiStepReasoning(): Promise<void> {
        // Step 1: Add domain knowledge
        await this.addDomainKnowledge();
        
        // Step 2: Perform inductive reasoning to find patterns
        const patterns = await this.openCogService.reason({
            type: 'inductive',
            context: { 
                domain: 'code-quality',
                examples: ['good_practice_1', 'good_practice_2', 'bad_practice_1']
            }
        });
        
        // Step 3: Apply deductive reasoning based on found patterns
        const recommendations = await this.openCogService.reason({
            type: 'deductive',
            atoms: patterns.conclusion,
            context: { target: 'current_codebase' }
        });
        
        // Step 4: Generate creative solutions through abductive reasoning
        const solutions = await this.openCogService.reason({
            type: 'abductive',
            atoms: recommendations.conclusion,
            context: { goal: 'improve_code_quality' }
        });
        
        console.log('Multi-step reasoning completed');
        console.log('Final solutions:', solutions);
    }

    private async addDomainKnowledge(): Promise<void> {
        // Add software engineering concepts
        await this.openCogService.addAtom({
            type: 'ConceptNode',
            name: 'good-code-practice',
            truthValue: { strength: 0.9, confidence: 0.8 }
        });

        await this.openCogService.addAtom({
            type: 'ConceptNode',
            name: 'code-smell',
            truthValue: { strength: 0.8, confidence: 0.9 }
        });

        // Add relationships
        await this.openCogService.addAtom({
            type: 'InheritanceLink',
            outgoing: [
                { type: 'ConceptNode', name: 'single-responsibility' },
                { type: 'ConceptNode', name: 'good-code-practice' }
            ],
            truthValue: { strength: 0.9, confidence: 0.9 }
        });
    }
}
```