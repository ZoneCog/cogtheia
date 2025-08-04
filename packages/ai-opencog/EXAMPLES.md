# Usage Examples

This file demonstrates usage of the @theia/ai-opencog package, including both basic OpenCog functionality and advanced knowledge management features.

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

## Knowledge Management Examples

### Creating and Managing Knowledge Graphs

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { KnowledgeManagementService } from '@theia/ai-opencog/lib/common';

@injectable()
export class KnowledgeManagementExample {

    constructor(
        @inject(KnowledgeManagementService) private readonly knowledgeService: KnowledgeManagementService
    ) {}

    async createSoftwareEngineeringKnowledge(): Promise<void> {
        // 1. Create a knowledge graph
        const graph = await this.knowledgeService.createKnowledgeGraph(
            'Software Engineering Patterns',
            'software-engineering',
            'Design patterns and architectural concepts'
        );

        // 2. Add core concepts
        const designPatternAtom = {
            type: 'ConceptNode',
            name: 'design-pattern',
            truthValue: { strength: 1.0, confidence: 0.9 }
        };
        await this.knowledgeService.addAtomToGraph(graph.id, designPatternAtom);

        const singletonPatternAtom = {
            type: 'ConceptNode',
            name: 'singleton-pattern',
            truthValue: { strength: 0.9, confidence: 0.8 }
        };
        await this.knowledgeService.addAtomToGraph(graph.id, singletonPatternAtom);

        const observerPatternAtom = {
            type: 'ConceptNode',
            name: 'observer-pattern',
            truthValue: { strength: 0.9, confidence: 0.8 }
        };
        await this.knowledgeService.addAtomToGraph(graph.id, observerPatternAtom);

        // 3. Add relationships
        const updatedGraph = await this.knowledgeService.getKnowledgeGraph(graph.id);
        const atomMap = new Map(updatedGraph!.atoms.map(a => [a.name!, a.id!]));

        await this.knowledgeService.addRelationship(graph.id, {
            id: '',
            type: 'extends',
            source: atomMap.get('singleton-pattern')!,
            target: atomMap.get('design-pattern')!,
            strength: 0.9,
            confidence: 0.8
        });

        await this.knowledgeService.addRelationship(graph.id, {
            id: '',
            type: 'extends',
            source: atomMap.get('observer-pattern')!,
            target: atomMap.get('design-pattern')!,
            strength: 0.9,
            confidence: 0.8
        });

        console.log(`Created knowledge graph: ${graph.name} with ${updatedGraph!.atoms.length} atoms`);
    }

    async demonstrateKnowledgeDiscovery(): Promise<void> {
        // Discover related concepts
        const discoveries = await this.knowledgeService.discoverKnowledge({
            type: 'semantic',
            seedConcepts: ['design-pattern'],
            scope: 'domain-specific',
            maxResults: 10,
            parameters: { domain: 'software-engineering' }
        });

        console.log('Discovered related concepts:');
        for (const discovery of discoveries) {
            console.log(`- ${discovery.concept.name}: ${discovery.explanation} (score: ${discovery.relevanceScore.toFixed(2)})`);
        }

        // Find concepts within relationship distance
        const designPatternAtoms = await this.knowledgeService.searchAtoms('design-pattern');
        if (designPatternAtoms.length > 0) {
            const relatedConcepts = await this.knowledgeService.getRelatedConcepts(
                designPatternAtoms[0].id!,
                2 // Max distance of 2 relationships
            );
            console.log(`Found ${relatedConcepts.length} related concepts within 2 relationship hops`);
        }
    }

    async demonstrateKnowledgeValidation(): Promise<void> {
        const graphs = await this.knowledgeService.getKnowledgeGraphs('software-engineering');
        if (graphs.length === 0) {
            console.log('No graphs to validate');
            return;
        }

        const graph = graphs[0];
        
        // Validate the knowledge graph
        const validation = await this.knowledgeService.validateKnowledgeGraph(graph.id);
        
        console.log(`Knowledge graph validation:`);
        console.log(`- Valid: ${validation.isValid}`);
        console.log(`- Confidence: ${validation.confidence.toFixed(2)}`);
        console.log(`- Issues found: ${validation.issues.length}`);
        
        for (const issue of validation.issues) {
            console.log(`  - ${issue.severity}: ${issue.description}`);
        }

        console.log(`- Suggestions: ${validation.suggestions.length}`);
        for (const suggestion of validation.suggestions) {
            console.log(`  - ${suggestion.description}`);
        }

        // Check for contradictions
        const contradictions = await this.knowledgeService.detectContradictions(graph.id);
        console.log(`Contradictions found: ${contradictions.issues.length}`);
    }

    async demonstrateKnowledgeAnalytics(): Promise<void> {
        // Get overall knowledge metrics
        const metrics = await this.knowledgeService.getKnowledgeMetrics();
        
        console.log('Knowledge Management Metrics:');
        console.log(`- Total graphs: ${metrics.totalGraphs}`);
        console.log(`- Total atoms: ${metrics.totalAtoms}`);
        console.log(`- Total relationships: ${metrics.totalRelationships}`);
        console.log(`- Average quality score: ${metrics.averageQuality.completeness.toFixed(2)}`);
        console.log(`- Memory usage: ${(metrics.memoryUsage / 1024).toFixed(2)} KB`);

        // Get recommendations for improvement
        const graphs = await this.knowledgeService.getKnowledgeGraphs();
        if (graphs.length > 0) {
            const recommendations = await this.knowledgeService.recommendImprovements(graphs[0].id);
            console.log('Improvement recommendations:');
            for (const rec of recommendations) {
                console.log(`- ${rec}`);
            }
        }
    }
}
```

### Knowledge Categorization

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { KnowledgeManagementService, KnowledgeCategory } from '@theia/ai-opencog/lib/common';

@injectable()
export class KnowledgeCategorizationExample {

    constructor(
        @inject(KnowledgeManagementService) private readonly knowledgeService: KnowledgeManagementService
    ) {}

    async setupKnowledgeCategories(): Promise<void> {
        // Create categories for different types of software engineering knowledge
        const designPatternsCategory: KnowledgeCategory = {
            id: '',
            name: 'Design Patterns',
            description: 'Software design patterns and architectural concepts',
            subcategories: [],
            associatedGraphs: [],
            rules: [
                {
                    id: 'pattern-rule-1',
                    type: 'pattern',
                    condition: 'pattern',
                    action: 'include',
                    weight: 1.0
                },
                {
                    id: 'pattern-rule-2',
                    type: 'pattern',
                    condition: 'singleton|observer|factory|strategy',
                    action: 'include',
                    weight: 0.9
                }
            ]
        };

        const dataStructuresCategory: KnowledgeCategory = {
            id: '',
            name: 'Data Structures',
            description: 'Data structures and algorithms',
            subcategories: [],
            associatedGraphs: [],
            rules: [
                {
                    id: 'ds-rule-1',
                    type: 'pattern',
                    condition: 'array|list|tree|graph|stack|queue',
                    action: 'include',
                    weight: 1.0
                }
            ]
        };

        const patternCategoryId = await this.knowledgeService.createCategory(designPatternsCategory);
        const dsCategoryId = await this.knowledgeService.createCategory(dataStructuresCategory);

        console.log(`Created categories: ${patternCategoryId}, ${dsCategoryId}`);

        // Demonstrate automatic categorization
        const graphs = await this.knowledgeService.getKnowledgeGraphs('software-engineering');
        if (graphs.length > 0) {
            const categorization = await this.knowledgeService.categorizeAtoms(graphs[0].id);
            
            console.log('Automatic categorization results:');
            for (const [atomId, categories] of categorization) {
                console.log(`Atom ${atomId} -> Categories: ${categories.join(', ')}`);
            }
        }
    }

    async getAtomsByCategory(): Promise<void> {
        const categories = await this.knowledgeService.getCategories();
        
        for (const category of categories) {
            const atoms = await this.knowledgeService.getAtomsByCategory(category.id);
            console.log(`Category "${category.name}" contains ${atoms.length} atoms:`);
            for (const atom of atoms.slice(0, 5)) { // Show first 5
                console.log(`  - ${atom.name} (${atom.type})`);
            }
        }
    }
}
```

## Enhanced Code Analysis Agent Usage

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { CodeAnalysisAgent } from '@theia/ai-opencog/lib/browser';

@injectable()
export class EnhancedCodeAnalysisExample {

    constructor(
        @inject(CodeAnalysisAgent) private readonly codeAnalysisAgent: CodeAnalysisAgent
    ) {}

    async analyzeFileWithKnowledgeEnhancement(fileUri: string): Promise<void> {
        try {
            const analysis = await this.codeAnalysisAgent.analyzeCode(fileUri);
            
            console.log(`Enhanced analysis for ${analysis.fileUri}:`);
            console.log(`Confidence: ${analysis.analysis.confidence}`);
            
            // Show related knowledge discoveries
            if (analysis.relatedKnowledge && analysis.relatedKnowledge.length > 0) {
                console.log('\nRelated Knowledge Discovered:');
                for (const discovery of analysis.relatedKnowledge) {
                    console.log(`Source: ${discovery.sourceAtom.name}`);
                    for (const related of discovery.relatedConcepts) {
                        console.log(`  - ${related.concept} (${(related.relevance * 100).toFixed(0)}%): ${related.explanation}`);
                    }
                }
            }

            // Show knowledge-enhanced recommendations
            console.log('\nRecommendations:');
            for (const recommendation of analysis.recommendations) {
                console.log(`- ${recommendation}`);
            }

            // Show knowledge metrics
            if (analysis.knowledgeMetrics) {
                console.log('\nKnowledge Metrics:');
                console.log(`- Code atoms: ${analysis.knowledgeMetrics.atomCount}`);
                console.log(`- Relationships: ${analysis.knowledgeMetrics.relationshipCount}`);
                console.log(`- Quality score: ${analysis.knowledgeMetrics.quality?.completeness.toFixed(2) || 'N/A'}`);
                console.log(`- Validation score: ${analysis.knowledgeMetrics.validationScore.toFixed(2)}`);
            }
            
        } catch (error) {
            console.error('Enhanced code analysis failed:', error);
        }
    }

    async searchAndCategorizeCodeKnowledge(): Promise<void> {
        // Search for specific code knowledge
        const functionAtoms = await this.codeAnalysisAgent.searchCodeKnowledge('function');
        console.log(`Found ${functionAtoms.length} function-related atoms`);

        const classAtoms = await this.codeAnalysisAgent.searchCodeKnowledge('class');
        console.log(`Found ${classAtoms.length} class-related atoms`);

        // Get categorized code concepts
        const categories = await this.codeAnalysisAgent.getCategorizedCodeConcepts();
        console.log('\nCategorized Code Concepts:');
        for (const [categoryName, atoms] of categories) {
            console.log(`${categoryName}:`);
            for (const atom of atoms.slice(0, 10)) { // Show first 10
                console.log(`  - ${atom.name} (${atom.type})`);
            }
        }
    }
}
```

## Knowledge Export/Import Examples

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { KnowledgeManagementService, KnowledgeTransferOptions } from '@theia/ai-opencog/lib/common';

@injectable()
export class KnowledgeTransferExample {

    constructor(
        @inject(KnowledgeManagementService) private readonly knowledgeService: KnowledgeManagementService
    ) {}

    async exportKnowledgeGraph(graphId: string): Promise<string> {
        const exportOptions: KnowledgeTransferOptions = {
            includeMetadata: true,
            includeRelationships: true,
            format: 'json'
        };

        const exportData = await this.knowledgeService.exportKnowledgeGraph(graphId, exportOptions);
        console.log('Knowledge graph exported successfully');
        
        // Save to file or send to external system
        // In practice, you'd use Theia's file system services
        console.log(`Export data size: ${exportData.length} characters`);
        
        return exportData;
    }

    async importKnowledgeGraph(exportData: string): Promise<string> {
        const importOptions: KnowledgeTransferOptions = {
            includeMetadata: true,
            includeRelationships: true,
            format: 'json'
        };

        const newGraphId = await this.knowledgeService.importKnowledgeGraph(exportData, importOptions);
        console.log(`Knowledge graph imported with ID: ${newGraphId}`);

        // Verify the import
        const importedGraph = await this.knowledgeService.getKnowledgeGraph(newGraphId);
        if (importedGraph) {
            console.log(`Imported graph "${importedGraph.name}" with ${importedGraph.atoms.length} atoms`);
        }

        return newGraphId;
    }

    async backupAndRestoreKnowledge(): Promise<void> {
        // Get all knowledge graphs
        const graphs = await this.knowledgeService.getKnowledgeGraphs();
        const backups: Map<string, string> = new Map();

        // Export all graphs
        for (const graph of graphs) {
            const exportData = await this.exportKnowledgeGraph(graph.id);
            backups.set(graph.id, exportData);
            console.log(`Backed up graph: ${graph.name}`);
        }

        console.log(`Backed up ${backups.size} knowledge graphs`);

        // Simulate restoration (in practice, this would be done from persistent storage)
        for (const [originalId, backupData] of backups) {
            const restoredId = await this.importKnowledgeGraph(backupData);
            console.log(`Restored graph ${originalId} as ${restoredId}`);
        }
    }
}
```

## Integration with Theia Commands

```typescript
import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { OpenCogService, KnowledgeManagementService } from '@theia/ai-opencog/lib/common';

export namespace OpenCogCommands {
    export const ANALYZE_WORKSPACE: Command = {
        id: 'opencog.analyze.workspace',
        label: 'OpenCog: Analyze Workspace'
    };
    
    export const SHOW_ATOMSPACE_STATS: Command = {
        id: 'opencog.atomspace.stats',
        label: 'OpenCog: Show AtomSpace Statistics'
    };

    export const SHOW_KNOWLEDGE_METRICS: Command = {
        id: 'opencog.knowledge.metrics',
        label: 'OpenCog: Show Knowledge Metrics'
    };

    export const EXPORT_KNOWLEDGE: Command = {
        id: 'opencog.knowledge.export',
        label: 'OpenCog: Export Knowledge Graph'
    };

    export const VALIDATE_KNOWLEDGE: Command = {
        id: 'opencog.knowledge.validate',
        label: 'OpenCog: Validate Knowledge Graphs'
    };
}

@injectable()
export class OpenCogCommandContribution implements CommandContribution {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService,
        @inject(KnowledgeManagementService) private readonly knowledgeService: KnowledgeManagementService
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

        commands.registerCommand(OpenCogCommands.SHOW_KNOWLEDGE_METRICS, {
            execute: async () => {
                const metrics = await this.knowledgeService.getKnowledgeMetrics();
                console.log('Knowledge Management Metrics:');
                console.log(`- Graphs: ${metrics.totalGraphs}`);
                console.log(`- Atoms: ${metrics.totalAtoms}`);
                console.log(`- Relationships: ${metrics.totalRelationships}`);
                console.log(`- Quality: ${metrics.averageQuality.completeness.toFixed(2)}`);
                console.log(`- Memory: ${(metrics.memoryUsage / 1024).toFixed(2)} KB`);
            }
        });

        commands.registerCommand(OpenCogCommands.EXPORT_KNOWLEDGE, {
            execute: async () => {
                const graphs = await this.knowledgeService.getKnowledgeGraphs();
                if (graphs.length === 0) {
                    console.log('No knowledge graphs to export');
                    return;
                }

                // Export the first graph as an example
                const exportData = await this.knowledgeService.exportKnowledgeGraph(graphs[0].id, {
                    includeMetadata: true,
                    includeRelationships: true,
                    format: 'json'
                });

                console.log(`Exported "${graphs[0].name}" (${exportData.length} characters)`);
                // In practice, you'd save this to a file or external system
            }
        });

        commands.registerCommand(OpenCogCommands.VALIDATE_KNOWLEDGE, {
            execute: async () => {
                const graphs = await this.knowledgeService.getKnowledgeGraphs();
                
                for (const graph of graphs) {
                    const validation = await this.knowledgeService.validateKnowledgeGraph(graph.id);
                    console.log(`Graph "${graph.name}": ${validation.isValid ? 'Valid' : 'Invalid'} (${validation.confidence.toFixed(2)} confidence)`);
                    
                    if (validation.issues.length > 0) {
                        console.log(`  Issues: ${validation.issues.length}`);
                        for (const issue of validation.issues.slice(0, 3)) {
                            console.log(`    - ${issue.severity}: ${issue.description}`);
                        }
                    }
                }
            }
        });
    }
}
```

## Advanced Multi-Service Integration

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { OpenCogService, KnowledgeManagementService } from '@theia/ai-opencog/lib/common';

@injectable()
export class AdvancedIntegrationExample {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService,
        @inject(KnowledgeManagementService) private readonly knowledgeService: KnowledgeManagementService
    ) {}

    async performIntegratedCognitiveAnalysis(): Promise<void> {
        // 1. Create specialized knowledge graph for the analysis
        const analysisGraph = await this.knowledgeService.createKnowledgeGraph(
            'Cognitive Analysis Session',
            'analysis',
            'Knowledge graph for current cognitive analysis session'
        );

        // 2. Add domain knowledge to both AtomSpace and Knowledge Graph
        const concepts = [
            { type: 'ConceptNode', name: 'code-quality' },
            { type: 'ConceptNode', name: 'maintainability' },
            { type: 'ConceptNode', name: 'performance' },
            { type: 'ConceptNode', name: 'security' }
        ];

        for (const concept of concepts) {
            // Add to traditional AtomSpace
            await this.openCogService.addAtom(concept);
            
            // Add to structured knowledge graph
            await this.knowledgeService.addAtomToGraph(analysisGraph.id, concept);
        }

        // 3. Perform reasoning in AtomSpace
        const reasoningResult = await this.openCogService.reason({
            type: 'inductive',
            atoms: concepts,
            context: { domain: 'software-quality' }
        });

        // 4. Use reasoning results to discover related knowledge
        if (reasoningResult.conclusion && reasoningResult.conclusion.length > 0) {
            const discoveries = await this.knowledgeService.discoverKnowledge({
                type: 'semantic',
                seedConcepts: reasoningResult.conclusion.map(a => a.name!).filter(Boolean),
                scope: 'global',
                maxResults: 10
            });

            console.log(`Discovered ${discoveries.length} related concepts`);
        }

        // 5. Validate the integrated knowledge
        const validation = await this.knowledgeService.validateKnowledgeGraph(analysisGraph.id);
        
        // 6. Learn from the analysis results
        await this.openCogService.learn({
            type: 'unsupervised',
            input: {
                reasoningResult,
                discoveredKnowledge: discoveries,
                validation
            },
            context: { session: 'cognitive-analysis', timestamp: Date.now() }
        });

        // 7. Generate final recommendations
        const finalRecommendations = await this.generateIntegratedRecommendations(
            reasoningResult,
            validation,
            analysisGraph.id
        );

        console.log('Integrated Cognitive Analysis Results:');
        console.log(`- Reasoning confidence: ${reasoningResult.confidence}`);
        console.log(`- Knowledge validation: ${validation.isValid ? 'Valid' : 'Invalid'}`);
        console.log(`- Recommendations: ${finalRecommendations.length}`);
    }

    private async generateIntegratedRecommendations(
        reasoningResult: any,
        validation: any,
        graphId: string
    ): Promise<string[]> {
        const recommendations: string[] = [];

        // Add reasoning-based recommendations
        if (reasoningResult.confidence > 0.7) {
            recommendations.push('High-confidence reasoning results suggest implementing suggested patterns');
        }

        // Add knowledge validation recommendations
        if (!validation.isValid) {
            recommendations.push('Knowledge validation issues detected - review and update knowledge base');
        }

        // Add knowledge management recommendations
        const improvements = await this.knowledgeService.recommendImprovements(graphId);
        recommendations.push(...improvements);

        return recommendations;
    }
}
```