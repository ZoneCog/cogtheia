# Usage Examples

This file demonstrates basic usage of the @theia/ai-opencog package.

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

        // 4. Learn from interactions
        await this.openCogService.learn({
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