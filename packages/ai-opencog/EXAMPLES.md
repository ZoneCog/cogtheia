# Usage Examples

This file demonstrates comprehensive usage of the enhanced @theia/ai-opencog package with advanced pattern recognition capabilities.

## Enhanced Pattern Recognition Examples

### Code Pattern Recognition

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { OpenCogService, PatternInput } from '@theia/ai-opencog/lib/common';

@injectable()
export class CodePatternAnalysis {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async analyzeCodePatterns(sourceCode: string): Promise<void> {
        // Configure pattern recognition for code analysis
        const patternInput: PatternInput = {
            data: sourceCode,
            context: {
                language: 'typescript',
                framework: 'theia',
                fileType: 'service'
            },
            scope: 'project',
            options: {
                maxResults: 15,
                minConfidence: 0.4,
                patternTypes: ['design-pattern', 'async-pattern', 'reactive-pattern', 'syntax-pattern'],
                includeLowConfidence: false
            }
        };

        const patterns = await this.openCogService.recognizePatterns(patternInput);
        
        console.log(`\n🔍 Detected ${patterns.length} code patterns:\n`);
        
        patterns.forEach((pattern, index) => {
            console.log(`${index + 1}. ${pattern.pattern.name || pattern.pattern.type}`);
            console.log(`   Type: ${pattern.metadata?.patternType}`);
            console.log(`   Confidence: ${(pattern.confidence * 100).toFixed(1)}%`);
            console.log(`   Instances: ${pattern.instances.length}`);
            console.log(`   Complexity: ${pattern.metadata?.complexity || 'unknown'}`);
            
            if (pattern.instances.length > 0) {
                console.log(`   Example: "${pattern.instances[0].text?.substring(0, 50)}..."`);
            }
            console.log('');
        });
    }

    async demonstrateSpecificPatterns(): Promise<void> {
        const dependencyInjectionCode = `
            @injectable()
            export class UserService {
                constructor(
                    @inject(DatabaseService) private db: DatabaseService,
                    @inject(LoggerService) private logger: LoggerService
                ) {}
                
                async getUser(id: string): Promise<User> {
                    return this.db.findUser(id);
                }
            }
            
            container.bind(UserService).to(UserService).inSingletonScope();
        `;

        const patterns = await this.openCogService.recognizePatterns({
            data: dependencyInjectionCode,
            context: { language: 'typescript' },
            options: {
                patternTypes: ['design-pattern'],
                minConfidence: 0.5
            }
        });

        const diPattern = patterns.find(p => p.pattern.name === 'dependency-injection');
        const singletonPattern = patterns.find(p => p.pattern.name === 'singleton-pattern');
        
        console.log('🏗️  Design Pattern Analysis:');
        console.log(`Dependency Injection: ${diPattern ? '✅ Found' : '❌ Not found'}`);
        console.log(`Singleton Pattern: ${singletonPattern ? '✅ Found' : '❌ Not found'}`);
    }
}
```

### Structural Pattern Analysis

```typescript
@injectable()
export class ArchitecturalPatternAnalysis {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async analyzeProjectStructure(): Promise<void> {
        // Analyze service architecture
        const serviceArchitecture = [
            { type: 'service', name: 'UserService', dependencies: ['DatabaseService', 'LoggerService'] },
            { type: 'service', name: 'OrderService', dependencies: ['DatabaseService', 'NotificationService'] },
            { type: 'service', name: 'PaymentService', dependencies: ['DatabaseService', 'SecurityService'] },
            { type: 'repository', name: 'UserRepository', dependencies: ['DatabaseService'] },
            { type: 'repository', name: 'OrderRepository', dependencies: ['DatabaseService'] },
            { type: 'controller', name: 'UserController', dependencies: ['UserService'] },
            { type: 'controller', name: 'OrderController', dependencies: ['OrderService', 'PaymentService'] }
        ];

        const structuralInput: PatternInput = {
            data: serviceArchitecture,
            context: {
                architecture: 'layered',
                framework: 'dependency-injection'
            },
            scope: 'global',
            options: {
                maxResults: 10,
                minConfidence: 0.3,
                patternTypes: ['structural', 'hierarchical', 'repetition']
            }
        };

        const patterns = await this.openCogService.recognizePatterns(structuralInput);
        
        console.log('🏛️  Architectural Pattern Analysis:');
        patterns.forEach(pattern => {
            console.log(`- ${pattern.pattern.type}: ${(pattern.confidence * 100).toFixed(1)}% confidence`);
            if (pattern.metadata?.frequency) {
                console.log(`  Frequency: ${pattern.metadata.frequency.toFixed(2)}`);
            }
        });
    }

    async analyzeSequencePatterns(): Promise<void> {
        // Detect mathematical sequences
        const sequences = [
            [1, 3, 5, 7, 9, 11, 13],      // Arithmetic sequence
            [2, 6, 18, 54, 162],          // Geometric sequence
            [1, 1, 2, 3, 5, 8, 13]        // Fibonacci sequence
        ];

        for (const sequence of sequences) {
            const patterns = await this.openCogService.recognizePatterns({
                data: sequence,
                scope: 'local'
            });

            console.log(`\n📊 Sequence [${sequence.join(', ')}]:`);
            patterns.forEach(pattern => {
                if (pattern.pattern.type?.includes('sequence')) {
                    console.log(`  ${pattern.pattern.type}: ${(pattern.confidence * 100).toFixed(1)}%`);
                    if (pattern.pattern.commonDifference) {
                        console.log(`    Common difference: ${pattern.pattern.commonDifference}`);
                    }
                    if (pattern.pattern.commonRatio) {
                        console.log(`    Common ratio: ${pattern.pattern.commonRatio}`);
                    }
                }
            });
        }
    }
}
```

### Behavioral Pattern Recognition

```typescript
@injectable()
export class BehavioralPatternAnalysis {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async analyzeUserInteractions(): Promise<void> {
        const userInteractions = {
            interactions: [
                { timestamp: 1000, action: 'file-open', target: 'user.service.ts' },
                { timestamp: 1200, action: 'edit', target: 'user.service.ts', lines: [42, 43, 44] },
                { timestamp: 1500, action: 'file-save', target: 'user.service.ts' },
                { timestamp: 1800, action: 'test-run', target: 'user.service.spec.ts' },
                { timestamp: 2100, action: 'file-open', target: 'user.controller.ts' },
                { timestamp: 2300, action: 'edit', target: 'user.controller.ts', lines: [15, 16] },
                { timestamp: 2500, action: 'file-save', target: 'user.controller.ts' },
                { timestamp: 2800, action: 'test-run', target: 'user.controller.spec.ts' }
            ],
            usage: {
                features: ['editor', 'test-runner', 'file-explorer'],
                frequency: 0.8,
                duration: 1800,
                tasks: 4
            }
        };

        const behavioralInput: PatternInput = {
            data: userInteractions,
            context: {
                userType: 'developer',
                sessionType: 'test-driven-development'
            },
            scope: 'local',
            options: {
                maxResults: 5,
                minConfidence: 0.3,
                patternTypes: ['behavioral', 'interaction-rhythm', 'usage-profile']
            }
        };

        const patterns = await this.openCogService.recognizePatterns(behavioralInput);
        
        console.log('👤 Behavioral Pattern Analysis:');
        patterns.forEach(pattern => {
            console.log(`\n- ${pattern.pattern.type}:`);
            console.log(`  Confidence: ${(pattern.confidence * 100).toFixed(1)}%`);
            
            if (pattern.pattern.averageInterval) {
                console.log(`  Average interval: ${pattern.pattern.averageInterval}ms`);
            }
            
            if (pattern.pattern.consistency) {
                console.log(`  Consistency: ${(pattern.pattern.consistency * 100).toFixed(1)}%`);
            }
            
            if (pattern.metadata?.efficiency) {
                console.log(`  Efficiency: ${pattern.metadata.efficiency.toFixed(4)} tasks/ms`);
            }
        });
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

    async performComprehensiveAnalysis(fileUri: string): Promise<void> {
        try {
            const analysis = await this.codeAnalysisAgent.analyzeCode(fileUri);
            
            console.log(`\n📋 Analysis Report for ${analysis.fileUri}:\n`);
            
            // Display quality metrics
            console.log('📊 Quality Metrics:');
            console.log(`  Overall Score: ${analysis.qualityMetrics.score}/1.0`);
            console.log(`  Pattern Diversity: ${analysis.qualityMetrics.patternDiversity}`);
            console.log(`  Average Confidence: ${analysis.qualityMetrics.averageConfidence}`);
            console.log(`  Design Pattern Usage: ${analysis.qualityMetrics.designPatternUsage}`);
            console.log(`  Total Patterns: ${analysis.qualityMetrics.totalPatterns}`);
            
            // Display detected patterns
            console.log('\n🔍 Detected Patterns:');
            analysis.patterns.forEach((pattern, index) => {
                console.log(`  ${index + 1}. ${pattern.pattern.name || pattern.pattern.type}`);
                console.log(`     Type: ${pattern.metadata?.patternType}`);
                console.log(`     Confidence: ${(pattern.confidence * 100).toFixed(1)}%`);
            });
            
            // Display recommendations
            console.log('\n💡 Recommendations:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec}`);
            });
            
            // Display analysis confidence
            console.log(`\n🎯 Analysis Confidence: ${(analysis.analysis.confidence * 100).toFixed(1)}%`);
            
        } catch (error) {
            console.error('❌ Enhanced code analysis failed:', error);
        }
    }

    async batchAnalyzeFiles(fileUris: string[]): Promise<void> {
        const results = [];
        
        for (const fileUri of fileUris) {
            try {
                const analysis = await this.codeAnalysisAgent.analyzeCode(fileUri);
                results.push({
                    file: fileUri,
                    score: analysis.qualityMetrics.score,
                    patternCount: analysis.patterns.length,
                    recommendations: analysis.recommendations.length
                });
            } catch (error) {
                console.error(`Failed to analyze ${fileUri}:`, error);
            }
        }
        
        // Sort by quality score
        results.sort((a, b) => b.score - a.score);
        
        console.log('\n📈 Batch Analysis Results (sorted by quality score):');
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.file}`);
            console.log(`   Score: ${result.score.toFixed(2)}`);
            console.log(`   Patterns: ${result.patternCount}`);
            console.log(`   Recommendations: ${result.recommendations}`);
        });
    }
}
```

## Basic AtomSpace Operations

```typescript
import { inject, injectable } from '@theia/core/shared/inversify';
import { OpenCogService } from '@theia/ai-opencog/lib/common';

@injectable()
export class BasicOpenCogUsage {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async demonstrateBasicOperations(): Promise<void> {
        // 1. Add atoms to the AtomSpace
        const conceptId = await this.openCogService.addAtom({
            type: 'ConceptNode',
            name: 'enhanced-pattern-recognition',
            truthValue: { strength: 0.9, confidence: 0.95 }
        });

        const relationId = await this.openCogService.addAtom({
            type: 'InheritanceLink',
            outgoing: [
                { type: 'ConceptNode', name: 'code-analysis' },
                { type: 'ConceptNode', name: 'cognitive-service' }
            ],
            truthValue: { strength: 0.85, confidence: 0.9 }
        });

        // 2. Query atoms
        const concepts = await this.openCogService.queryAtoms({
            type: 'ConceptNode'
        });
        console.log(`Found ${concepts.length} concept nodes`);

        // 3. Perform enhanced reasoning with pattern context
        const reasoningResult = await this.openCogService.reason({
            type: 'code-analysis',
            atoms: concepts,
            context: { 
                domain: 'software-engineering',
                enhancedPatternRecognition: true,
                confidence: 0.8
            }
        });
        console.log(`Reasoning confidence: ${reasoningResult.confidence}`);

        // 4. Learn from pattern recognition results
        await this.openCogService.learn({
            type: 'supervised',
            input: { patternType: 'design-pattern', instances: 5 },
            feedback: {
                rating: 5,
                helpful: true,
                comment: 'Excellent pattern detection accuracy'
            }
        });

        // 5. AtomSpace management
        const size = await this.openCogService.getAtomSpaceSize();
        console.log(`AtomSpace contains ${size} atoms`);
        
        const exportData = await this.openCogService.exportAtomSpace();
        console.log(`Exported ${exportData.length} characters of AtomSpace data`);
    }
}
```

## Integration with Theia Commands

```typescript
import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { OpenCogService } from '@theia/ai-opencog/lib/common';

export namespace EnhancedOpenCogCommands {
    export const ANALYZE_PATTERNS: Command = {
        id: 'opencog.analyze.patterns',
        label: 'OpenCog: Analyze Code Patterns'
    };
    
    export const QUALITY_ASSESSMENT: Command = {
        id: 'opencog.quality.assessment',
        label: 'OpenCog: Quality Assessment'
    };

    export const PATTERN_DASHBOARD: Command = {
        id: 'opencog.pattern.dashboard',
        label: 'OpenCog: Pattern Recognition Dashboard'
    };
}

@injectable()
export class EnhancedOpenCogCommandContribution implements CommandContribution {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(EnhancedOpenCogCommands.ANALYZE_PATTERNS, {
            execute: async (fileUri?: string) => {
                if (fileUri) {
                    // Analyze specific file
                    const patterns = await this.openCogService.recognizePatterns({
                        data: '/* file content would be loaded here */',
                        context: { fileUri, language: 'typescript' },
                        options: { maxResults: 20, minConfidence: 0.3 }
                    });
                    
                    console.log(`Found ${patterns.length} patterns in ${fileUri}`);
                } else {
                    console.log('Please select a file to analyze');
                }
            }
        });

        commands.registerCommand(EnhancedOpenCogCommands.QUALITY_ASSESSMENT, {
            execute: async () => {
                const result = await this.openCogService.reason({
                    type: 'code-analysis',
                    context: { 
                        scope: 'workspace',
                        includeQualityMetrics: true
                    }
                });
                
                console.log('Quality Assessment completed:', result);
            }
        });

        commands.registerCommand(EnhancedOpenCogCommands.PATTERN_DASHBOARD, {
            execute: async () => {
                const size = await this.openCogService.getAtomSpaceSize();
                console.log(`\n🧠 OpenCog Pattern Recognition Dashboard`);
                console.log(`AtomSpace size: ${size} atoms`);
                console.log(`Enhanced pattern recognition: ✅ Active`);
                console.log(`Supported pattern types: Code, Structural, Behavioral`);
                console.log(`Confidence scoring: ✅ Enabled`);
            }
        });
    }
}
```

## Advanced Multi-Modal Pattern Recognition

```typescript
@injectable()
export class MultiModalPatternAnalysis {

    constructor(
        @inject(OpenCogService) private readonly openCogService: OpenCogService
    ) {}

    async performCrossModalAnalysis(): Promise<void> {
        // Combine code patterns with behavioral patterns
        const codePatterns = await this.openCogService.recognizePatterns({
            data: `function complexFunction() { /* complex implementation */ }`,
            context: { language: 'javascript' },
            options: { patternTypes: ['code', 'syntax-pattern'] }
        });

        const behaviorPatterns = await this.openCogService.recognizePatterns({
            data: {
                interactions: [
                    { timestamp: 1000, action: 'function-edit', complexity: 'high' },
                    { timestamp: 2000, action: 'refactor-attempt', success: false },
                    { timestamp: 3000, action: 'help-search', query: 'simplify function' }
                ]
            },
            options: { patternTypes: ['behavioral'] }
        });

        // Correlate patterns across modalities
        console.log('\n🔗 Cross-Modal Pattern Correlation:');
        
        const highComplexityCode = codePatterns.filter(p => 
            p.metadata?.complexity === 'complex'
        );
        
        const strugglingBehavior = behaviorPatterns.filter(p => 
            p.pattern.type === 'interaction-rhythm' && p.confidence < 0.5
        );

        if (highComplexityCode.length > 0 && strugglingBehavior.length > 0) {
            console.log('🚨 Detected correlation: Complex code + struggling behavior');
            console.log('💡 Suggestion: Provide refactoring assistance');
        }
    }

    async analyzeTemporalPatterns(): Promise<void> {
        // Analyze patterns over time
        const timeSeriesData = [
            { timestamp: 1000, codeComplexity: 0.3, userConfidence: 0.8 },
            { timestamp: 2000, codeComplexity: 0.5, userConfidence: 0.7 },
            { timestamp: 3000, codeComplexity: 0.8, userConfidence: 0.5 },
            { timestamp: 4000, codeComplexity: 0.4, userConfidence: 0.9 }
        ];

        const patterns = await this.openCogService.recognizePatterns({
            data: timeSeriesData,
            context: { temporal: true, domain: 'development-session' },
            options: { 
                patternTypes: ['sequence', 'behavioral'],
                minConfidence: 0.2
            }
        });

        console.log('\n⏰ Temporal Pattern Analysis:');
        patterns.forEach(pattern => {
            console.log(`- ${pattern.pattern.type}: ${(pattern.confidence * 100).toFixed(1)}%`);
            if (pattern.metadata?.consistency) {
                console.log(`  Consistency over time: ${(pattern.metadata.consistency * 100).toFixed(1)}%`);
            }
        });
    }
}
```