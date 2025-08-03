# @theia/ai-opencog

OpenCog AI Integration for Theia - Foundation Infrastructure

## Overview

This package provides the foundational infrastructure for integrating OpenCog's cognitive capabilities into the Theia IDE platform. It implements Phase 1 of the comprehensive Theia-OpenCog Integration Roadmap, focusing on basic service interfaces and communication protocols.

## Features

### Phase 1 Implementation (Foundation Infrastructure)

- **OpenCog Service Package**: Core service interfaces for OpenCog integration
- **AtomSpace Integration**: Basic AtomSpace operations for knowledge representation
- **Communication Protocol**: JSON-RPC extensions for OpenCog-specific operations
- **Agent System Integration**: OpenCog-powered AI agents extending Theia's agent framework

## Components

### Core Services

- `OpenCogService`: Main service interface for OpenCog operations
- `AtomSpaceService`: Backend implementation of AtomSpace functionality
- `FrontendOpenCogService`: Frontend proxy for RPC communication

### AI Agents

- `CodeAnalysisAgent`: Cognitive code analysis using OpenCog reasoning

### Data Types

- `Atom`: OpenCog atom representation
- `TruthValue`: Truth value for cognitive reasoning
- `AttentionValue`: Attention mechanism for atom importance
- `ReasoningQuery`: Query structure for reasoning operations
- `LearningData`: Input data for learning operations

## Usage

### Basic AtomSpace Operations

```typescript
import { OpenCogService } from '@theia/ai-opencog/lib/common';

// Add an atom to the AtomSpace
const atomId = await openCogService.addAtom({
    type: 'ConceptNode',
    name: 'example-concept',
    truthValue: { strength: 0.8, confidence: 0.9 }
});

// Query atoms
const atoms = await openCogService.queryAtoms({
    type: 'ConceptNode'
});
```

### Reasoning Operations

```typescript
// Perform code analysis reasoning
const result = await openCogService.reason({
    type: 'code-analysis',
    context: {
        fileUri: 'file:///path/to/code.ts',
        language: 'typescript'
    }
});
```

### Learning from User Interactions

```typescript
// Learn from user feedback
await openCogService.learn({
    type: 'supervised',
    input: codeSnippet,
    feedback: {
        rating: 4,
        helpful: true,
        comment: 'Good suggestion'
    }
});
```

## Architecture

The integration follows Theia's extension architecture with separate frontend and backend modules:

- **Backend** (`/node`): AtomSpace implementation and core reasoning services
- **Frontend** (`/browser`): RPC proxies and agent implementations
- **Common** (`/common`): Shared interfaces and types

## API Documentation

### OpenCogService Interface

#### AtomSpace Operations
- `addAtom(atom: Atom): Promise<string>` - Add an atom to the AtomSpace
- `queryAtoms(pattern: AtomPattern): Promise<Atom[]>` - Query atoms by pattern
- `removeAtom(atomId: string): Promise<boolean>` - Remove an atom
- `updateAtom(atomId: string, updates: Partial<Atom>): Promise<boolean>` - Update an atom

#### Reasoning Operations
- `reason(query: ReasoningQuery): Promise<ReasoningResult>` - Perform reasoning operations

#### Learning Operations
- `learn(data: LearningData): Promise<void>` - Learn from input data

#### Pattern Recognition
- `recognizePatterns(input: PatternInput): Promise<PatternResult[]>` - Recognize patterns in data

## Development Status

This is Phase 1 implementation focusing on foundation infrastructure. Current capabilities are basic and serve as a foundation for future cognitive enhancements.

### Implemented Features ✅
- Basic AtomSpace operations
- Service interfaces and protocols
- Agent system integration
- RPC communication setup

### Future Phases 🚧
- Advanced reasoning engines (Phase 3)
- Sensor-motor systems (Phase 4)
- Machine learning integration (Phase 3)
- Production optimization (Phase 5-6)

## Contributing

This package follows Theia's contribution guidelines. See the main repository documentation for development setup and contribution processes.

## License

Eclipse Public License 2.0 OR GPL-2.0-only WITH Classpath-exception-2.0