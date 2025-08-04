# @theia/ai-opencog

OpenCog AI Integration for Theia - Foundation Infrastructure with Knowledge Management

## Overview

This package provides the foundational infrastructure for integrating OpenCog's cognitive capabilities into the Theia IDE platform. It implements Phase 1 and Phase 2 capabilities of the comprehensive Theia-OpenCog Integration Roadmap, including advanced knowledge management services for organizing and managing cognitive knowledge.

## Features

### Phase 1 Implementation (Foundation Infrastructure) ✅

- **OpenCog Service Package**: Core service interfaces for OpenCog integration
- **AtomSpace Integration**: Basic AtomSpace operations for knowledge representation
- **Communication Protocol**: JSON-RPC extensions for OpenCog-specific operations
- **Agent System Integration**: OpenCog-powered AI agents extending Theia's agent framework

### Phase 2 Implementation (Core Cognitive Services) ✅

- **Knowledge Management Services**: Advanced knowledge organization and management
- **Knowledge Graph Management**: Create, organize, and maintain knowledge graphs
- **Knowledge Discovery**: Find related concepts and patterns in knowledge base
- **Knowledge Validation**: Ensure knowledge quality and consistency
- **Knowledge Categorization**: Organize knowledge into domains and categories
- **Knowledge Persistence**: Save and load knowledge bases with versioning

## Components

### Core Services

- `OpenCogService`: Main service interface for OpenCog operations
- `AtomSpaceService`: Backend implementation of AtomSpace functionality
- `FrontendOpenCogService`: Frontend proxy for RPC communication
- `KnowledgeManagementService`: Advanced knowledge management capabilities
- `FrontendKnowledgeManagementService`: Frontend proxy for knowledge management

### AI Agents

- `CodeAnalysisAgent`: Enhanced cognitive code analysis using OpenCog reasoning and knowledge management

### Data Types

#### Basic OpenCog Types
- `Atom`: OpenCog atom representation
- `TruthValue`: Truth value for cognitive reasoning
- `AttentionValue`: Attention mechanism for atom importance
- `ReasoningQuery`: Query structure for reasoning operations
- `LearningData`: Input data for learning operations

#### Knowledge Management Types
- `KnowledgeGraph`: Structured knowledge representation
- `KnowledgeCategory`: Knowledge organization categories
- `KnowledgeRelationship`: Relationships between knowledge entities
- `KnowledgeDiscoveryQuery`: Queries for discovering related knowledge
- `KnowledgeValidationResult`: Results from knowledge validation
- `KnowledgeMetrics`: Metrics for knowledge quality and usage

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

### Knowledge Graph Management

```typescript
import { KnowledgeManagementService } from '@theia/ai-opencog/lib/common';

// Create a knowledge graph
const graph = await knowledgeService.createKnowledgeGraph(
    'Software Engineering Knowledge',
    'software-engineering',
    'Knowledge about software engineering concepts'
);

// Add atoms to the graph
await knowledgeService.addAtomToGraph(graph.id, {
    type: 'ConceptNode',
    name: 'design-pattern',
    truthValue: { strength: 0.9, confidence: 0.8 }
});

// Add relationships between concepts
await knowledgeService.addRelationship(graph.id, {
    type: 'relates-to',
    source: 'design-pattern-atom-id',
    target: 'architecture-atom-id',
    strength: 0.8,
    confidence: 0.7
});
```

### Knowledge Discovery

```typescript
// Discover related knowledge
const discoveries = await knowledgeService.discoverKnowledge({
    type: 'semantic',
    seedConcepts: ['design-pattern'],
    scope: 'domain-specific',
    maxResults: 10,
    parameters: { domain: 'software-engineering' }
});

// Find similar concepts
const similar = await knowledgeService.findSimilarConcepts('concept-id', 5);

// Get related concepts within distance
const related = await knowledgeService.getRelatedConcepts('concept-id', 2);
```

### Knowledge Validation

```typescript
// Validate knowledge graph
const validation = await knowledgeService.validateKnowledgeGraph(graph.id);

if (!validation.isValid) {
    console.log('Validation issues:', validation.issues);
    console.log('Suggestions:', validation.suggestions);
}

// Detect contradictions
const contradictions = await knowledgeService.detectContradictions(graph.id);
```

### Knowledge Export/Import

```typescript
// Export knowledge graph
const exportData = await knowledgeService.exportKnowledgeGraph(graph.id, {
    includeMetadata: true,
    includeRelationships: true,
    format: 'json'
});

// Import knowledge graph
const newGraphId = await knowledgeService.importKnowledgeGraph(exportData, {
    includeMetadata: true,
    includeRelationships: true,
    format: 'json'
});
```

### Enhanced Code Analysis

```typescript
// Use the enhanced code analysis agent
const codeAgent = container.get(CodeAnalysisAgent);

// Analyze code with knowledge management
const analysis = await codeAgent.analyzeCode('file:///path/to/code.ts');

// Analysis now includes:
// - Basic reasoning results
// - Related knowledge discoveries
// - Knowledge-enhanced recommendations
// - Knowledge quality metrics

// Search code knowledge
const codeKnowledge = await codeAgent.searchCodeKnowledge('function');

// Get categorized concepts
const categories = await codeAgent.getCategorizedCodeConcepts();
```

## Architecture

The integration follows Theia's extension architecture with separate frontend and backend modules:

- **Backend** (`/node`): AtomSpace implementation, knowledge management services, and core reasoning
- **Frontend** (`/browser`): RPC proxies and enhanced agent implementations
- **Common** (`/common`): Shared interfaces, types, and knowledge management definitions

### Knowledge Management Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Knowledge Management Layer                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Knowledge Graphs│  │   Categories    │  │   Discovery     │ │
│  │  - Creation     │  │  - Auto-classify│  │  - Semantic     │ │
│  │  - Management   │  │  - Rules        │  │  - Structural   │ │
│  │  - Validation   │  │  - Hierarchies  │  │  - Temporal     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                      AtomSpace Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Atoms        │  │  Relationships  │  │   Reasoning     │ │
│  │  - Concepts     │  │  - Links        │  │  - Inference    │ │
│  │  - Truth Values │  │  - Dependencies │  │  - Learning     │ │
│  │  - Attention    │  │  - Hierarchies  │  │  - Patterns     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## API Documentation

### OpenCogService Interface

#### AtomSpace Operations
- `addAtom(atom: Atom): Promise<string>` - Add an atom to the AtomSpace
- `queryAtoms(pattern: AtomPattern): Promise<Atom[]>` - Query atoms by pattern
- `removeAtom(atomId: string): Promise<boolean>` - Remove an atom
- `updateAtom(atomId: string, updates: Partial<Atom>): Promise<boolean>` - Update an atom
- `getKnowledgeManagementService(): KnowledgeManagementService` - Access knowledge management

#### Reasoning Operations
- `reason(query: ReasoningQuery): Promise<ReasoningResult>` - Perform reasoning operations

#### Learning Operations
- `learn(data: LearningData): Promise<void>` - Learn from input data

#### Pattern Recognition
- `recognizePatterns(input: PatternInput): Promise<PatternResult[]>` - Recognize patterns in data

### KnowledgeManagementService Interface

#### Knowledge Graph Management
- `createKnowledgeGraph(name, domain, description?)` - Create new knowledge graph
- `getKnowledgeGraph(graphId)` - Retrieve knowledge graph
- `getKnowledgeGraphs(domain?)` - List knowledge graphs
- `addAtomToGraph(graphId, atom)` - Add atom to graph
- `addRelationship(graphId, relationship)` - Add relationship

#### Knowledge Discovery
- `discoverKnowledge(query)` - Discover related knowledge
- `findSimilarConcepts(atomId, maxResults?)` - Find similar concepts
- `getConceptPath(sourceId, targetId)` - Get relationship path
- `getRelatedConcepts(atomId, maxDistance)` - Get related concepts

#### Knowledge Validation
- `validateKnowledgeGraph(graphId)` - Validate graph
- `validateAtom(atomId)` - Validate specific atom
- `detectContradictions(graphId?)` - Detect contradictions

#### Knowledge Analytics
- `getKnowledgeMetrics()` - Get system metrics
- `getGraphUsageStats(graphId)` - Get usage statistics
- `recommendImprovements(graphId)` - Get improvement suggestions

## Development Status

### Implemented Features ✅
- Basic AtomSpace operations (Phase 1)
- Service interfaces and protocols (Phase 1)
- Agent system integration (Phase 1)
- RPC communication setup (Phase 1)
- **Knowledge Management Services (Phase 2)**
- **Knowledge Graph Management (Phase 2)**
- **Knowledge Discovery and Validation (Phase 2)**
- **Enhanced Code Analysis Agent (Phase 2)**

### Future Phases 🚧
- Advanced reasoning engines (Phase 3)
- AI Agent Enhancement (Phase 3)
- Frontend Integration (Phase 4)
- Advanced Features (Phase 5)

## Testing

The package includes comprehensive test coverage for both basic OpenCog functionality and knowledge management features:

```bash
# Run tests
npm test

# Run specific test suites
npm test -- --grep "KnowledgeManagementService"
npm test -- --grep "AtomSpaceService"
```

## Contributing

This package follows Theia's contribution guidelines. See the main repository documentation for development setup and contribution processes.

## License

Eclipse Public License 2.0 OR GPL-2.0-only WITH Classpath-exception-2.0