# @theia/ai-opencog

OpenCog AI Integration for Theia - Enhanced Pattern Recognition Capabilities

## Overview

This package provides sophisticated pattern recognition capabilities as part of the OpenCog integration with Theia IDE. It implements Phase 2 enhancements of the comprehensive Theia-OpenCog Integration Roadmap, focusing on advanced pattern recognition and cognitive analysis.

## Features

### Phase 2 Implementation (Core Cognitive Services)

- **Enhanced Pattern Recognition**: Sophisticated algorithms for detecting various pattern types
- **Code Pattern Analysis**: Recognition of programming patterns, design patterns, and anti-patterns
- **Structural Pattern Detection**: Analysis of data structures and architectural patterns
- **Behavioral Pattern Recognition**: Understanding of user interaction and usage patterns
- **Cognitive Code Analysis**: AI-powered code analysis with pattern-based insights

### Phase 1 Foundation (Maintained)

- **OpenCog Service Package**: Core service interfaces for OpenCog integration
- **AtomSpace Integration**: Basic AtomSpace operations for knowledge representation
- **Communication Protocol**: JSON-RPC extensions for OpenCog-specific operations
- **Agent System Integration**: OpenCog-powered AI agents extending Theia's agent framework

## Components

### Core Services

- `OpenCogService`: Main service interface for OpenCog operations
- `AtomSpaceService`: Backend implementation with enhanced pattern recognition
- `FrontendOpenCogService`: Frontend proxy for RPC communication

### AI Agents

- `CodeAnalysisAgent`: Enhanced cognitive code analysis using pattern recognition

### Pattern Recognition Engine

- **Code Patterns**: Functions, classes, async/await, design patterns, reactive patterns
- **Structural Patterns**: Sequences, repetitions, hierarchical structures
- **Behavioral Patterns**: Interaction rhythms, usage profiles, workflow patterns

### Data Types

- `Atom`: OpenCog atom representation
- `PatternInput`: Input for pattern recognition with options and context
- `PatternResult`: Rich pattern results with confidence scoring and metadata
- `PatternRecognitionOptions`: Configuration for pattern recognition behavior

## Usage

### Enhanced Pattern Recognition

```typescript
import { OpenCogService, PatternInput } from '@theia/ai-opencog/lib/common';

// Recognize code patterns
const codeInput: PatternInput = {
    data: sourceCode,
    context: { language: 'typescript', framework: 'theia' },
    scope: 'project',
    options: {
        maxResults: 20,
        minConfidence: 0.3,
        patternTypes: ['design-pattern', 'async-pattern', 'reactive-pattern']
    }
};

const patterns = await openCogService.recognizePatterns(codeInput);
patterns.forEach(pattern => {
    console.log(`Pattern: ${pattern.pattern.name}`);
    console.log(`Confidence: ${(pattern.confidence * 100).toFixed(1)}%`);
    console.log(`Instances: ${pattern.instances.length}`);
});
```

### Code Quality Analysis

```typescript
// Enhanced code analysis with pattern insights
const analysis = await codeAnalysisAgent.analyzeCode('file:///src/service.ts');

console.log('Quality Metrics:', analysis.qualityMetrics);
console.log('Detected Patterns:', analysis.patterns.length);
console.log('Recommendations:', analysis.recommendations);
```

### Structural Pattern Detection

```typescript
// Analyze architectural patterns
const structuralInput: PatternInput = {
    data: [
        { type: 'service', dependencies: ['DatabaseService', 'LoggerService'] },
        { type: 'repository', dependencies: ['DatabaseService'] },
        { type: 'controller', dependencies: ['UserService'] }
    ],
    scope: 'global',
    options: { patternTypes: ['structural', 'hierarchical'] }
};

const architecturalPatterns = await openCogService.recognizePatterns(structuralInput);
```

### Behavioral Analysis

```typescript
// Analyze user interaction patterns
const behavioralInput: PatternInput = {
    data: {
        interactions: [
            { timestamp: 1000, action: 'file-open', target: 'user.service.ts' },
            { timestamp: 1200, action: 'edit', target: 'user.service.ts' },
            { timestamp: 1500, action: 'test-run', target: 'user.service.spec.ts' }
        ]
    },
    options: { patternTypes: ['behavioral', 'interaction-rhythm'] }
};

const behaviorPatterns = await openCogService.recognizePatterns(behavioralInput);
```

## Pattern Types

### Code Patterns
- **Syntax Patterns**: Function declarations, arrow functions, class definitions
- **Design Patterns**: Dependency injection, singleton, observer, factory
- **Async Patterns**: Promise chains, async/await, reactive streams
- **Reactive Patterns**: Observable operations, RxJS patterns

### Structural Patterns
- **Sequences**: Arithmetic and geometric progressions
- **Repetitions**: Recurring elements and frequencies
- **Hierarchical**: Nested structures and tree patterns

### Behavioral Patterns
- **Interaction Rhythms**: User interaction timing and consistency
- **Usage Profiles**: Feature usage and efficiency metrics
- **Workflow Patterns**: Development workflow analysis

## Pattern Confidence Scoring

The system provides sophisticated confidence scoring based on:
- Pattern frequency and distribution
- Context relevance and scope
- Instance quality and consistency
- Historical pattern reliability

```typescript
// Confidence factors
const confidence = baseScore * contextMultiplier * frequencyBonus * consistencyFactor;
```

## Architecture

### Enhanced Pattern Recognition Pipeline

1. **Input Analysis**: Determine data type and context
2. **Pattern Detection**: Apply appropriate recognition algorithms
3. **Confidence Scoring**: Calculate pattern reliability scores
4. **Filtering & Ranking**: Sort by confidence and filter by thresholds
5. **Metadata Enrichment**: Add contextual information and metrics

### Service Architecture

- **Backend** (`/node`): Enhanced AtomSpace with pattern recognition engine
- **Frontend** (`/browser`): Pattern-aware agents and analysis tools
- **Common** (`/common`): Pattern types, interfaces, and demonstration utilities

## API Documentation

### Enhanced OpenCogService Interface

#### Pattern Recognition
- `recognizePatterns(input: PatternInput): Promise<PatternResult[]>` - Advanced pattern recognition with configurable options

#### Pattern Input Options
```typescript
interface PatternRecognitionOptions {
    maxResults?: number;           // Maximum patterns to return (default: 10)
    minConfidence?: number;        // Minimum confidence threshold (default: 0.1)
    patternTypes?: PatternType[];  // Specific pattern types to detect
    includeLowConfidence?: boolean; // Include low-confidence patterns
}
```

#### Pattern Metadata
```typescript
interface PatternMetadata {
    patternType: PatternType;      // Primary pattern classification
    complexity: 'simple' | 'moderate' | 'complex';
    language?: string;             // Programming language (for code patterns)
    frequency?: number;            // Pattern occurrence frequency
    efficiency?: number;           // Usage efficiency metrics
    consistency?: number;          // Pattern consistency score
}
```

## Development Status

This is Phase 2 implementation focusing on advanced pattern recognition capabilities.

### Implemented Features ✅
- **Advanced Pattern Recognition Engine**: Multiple algorithm types with confidence scoring
- **Code Pattern Detection**: 8+ code pattern types with language-specific analysis
- **Structural Pattern Analysis**: Sequence, repetition, and hierarchical pattern detection
- **Behavioral Pattern Recognition**: Interaction and usage pattern analysis
- **Enhanced Code Analysis Agent**: Pattern-based code quality assessment
- **Comprehensive Test Suite**: Full test coverage for all pattern types
- **Rich Metadata Support**: Detailed pattern information and metrics

### Enhanced Capabilities
- **Quality Metrics**: Automated code quality scoring based on pattern analysis
- **Smart Recommendations**: Context-aware suggestions based on detected patterns
- **Pattern Filtering**: Configurable confidence thresholds and type filtering
- **Caching & Optimization**: Efficient pattern recognition with result caching

### Future Enhancements 🚧
- **Machine Learning Integration**: Pattern learning from user feedback
- **Cross-file Pattern Analysis**: Project-wide pattern detection
- **Real-time Pattern Monitoring**: Live pattern detection during development
- **Pattern Evolution Tracking**: Historical pattern change analysis

## Performance

The enhanced pattern recognition engine is optimized for:
- **Low Latency**: < 100ms for typical code analysis
- **Memory Efficiency**: Optimized pattern caching and cleanup
- **Scalability**: Handles large codebases with incremental analysis
- **Accuracy**: High confidence scoring with low false positive rates

## Contributing

This package follows Theia's contribution guidelines. See the main repository documentation for development setup and contribution processes.

## License

Eclipse Public License 2.0 OR GPL-2.0-only WITH Classpath-exception-2.0