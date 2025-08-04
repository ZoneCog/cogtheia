# @theia/ai-opencog

OpenCog AI Integration for Theia - Enhanced Learning and Adaptation Systems

## Overview

This package provides comprehensive learning and adaptation capabilities for integrating OpenCog's cognitive AI into the Theia IDE platform. It implements Phase 2 of the Theia-OpenCog Integration Roadmap, focusing on advanced learning systems, user behavior adaptation, and personalized IDE experiences.

## Features

### Phase 1 Implementation (Foundation Infrastructure) ✅

- **OpenCog Service Package**: Core service interfaces for OpenCog integration
- **AtomSpace Integration**: Basic AtomSpace operations for knowledge representation
- **Communication Protocol**: JSON-RPC extensions for OpenCog-specific operations
- **Agent System Integration**: OpenCog-powered AI agents extending Theia's agent framework

### Phase 2 Implementation (Learning and Adaptation Systems) ✅

- **Advanced Learning Algorithms**: Supervised, unsupervised, reinforcement, and adaptive learning
- **User Behavior Learning**: Tracks and learns from user patterns and preferences
- **Personalization System**: Adapts IDE behavior based on individual user preferences
- **Behavioral Pattern Recognition**: Identifies and predicts user workflow patterns
- **Feedback Processing**: Learns from user feedback to improve suggestions
- **Learning Model Management**: Create, train, and manage various learning models
- **Adaptation Strategies**: Dynamic adaptation of IDE features per user and context

## Components

### Core Services

- `OpenCogService`: Main service interface for OpenCog operations
- `AtomSpaceService`: Backend implementation of AtomSpace functionality with learning capabilities
- `FrontendOpenCogService`: Frontend proxy for RPC communication

### AI Agents

- `CodeAnalysisAgent`: Cognitive code analysis using OpenCog reasoning
- `LearningAdaptationAgent`: Specialized agent for learning and adaptation tasks

### Learning and Adaptation Features

- **Learning Data Types**: Comprehensive learning data structures supporting multiple learning paradigms
- **Adaptation Strategies**: User-specific adaptation strategies for different IDE domains
- **Behavior Patterns**: Tracking and analysis of user behavior patterns
- **Learning Models**: Machine learning model management with training and evaluation
- **Personalization**: User preference storage and adaptive behavior modification

### Data Types

- `Atom`: OpenCog atom representation
- `TruthValue`: Truth value for cognitive reasoning
- `AttentionValue`: Attention mechanism for atom importance
- `ReasoningQuery`: Query structure for reasoning operations
- `LearningData`: Enhanced learning data with context and feedback
- `LearningModel`: Learning model structure with training capabilities
- `AdaptationStrategy`: User adaptation strategy with effectiveness tracking
- `UserBehaviorPattern`: User behavior pattern with frequency and confidence metrics

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

### Learning and Adaptation

```typescript
// Learn from user feedback
await openCogService.learnFromFeedback(
    { rating: 5, helpful: true, outcome: 'accepted' },
    { userId: 'user123', currentTask: 'coding' }
);

// Adapt to user behavior
const strategy = await openCogService.adaptToUser('user123', 'code_completion', {
    preferences: { maxSuggestions: 8 }
});

// Learn user behavior patterns
await openCogService.learnUserBehavior('user123', 'open_file', {
    fileType: 'typescript',
    timeOfDay: 'morning'
});

// Get behavior predictions
const predictions = await openCogService.predictUserAction('user123', {
    projectType: 'web_app'
});
```

### Learning Model Management

```typescript
// Create and train learning models
const model = await openCogService.createLearningModel('code_completion', {
    algorithm: 'neural_network'
});

const updatedModel = await openCogService.updateLearningModel(model.id, trainingData);

// Get learning analytics
const stats = await openCogService.getLearningStats();
```

### Personalization

```typescript
// Set user preferences
await openCogService.personalize('user123', {
    theme: 'dark',
    preferredLanguage: 'typescript',
    maxSuggestions: 8
});

// Get personalized settings
const preferences = await openCogService.getPersonalization('user123');
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

### Learning Operations
- `learn(data: LearningData): Promise<void>` - Learn from input data
- `learnFromFeedback(feedback: UserFeedback, context: LearningContext): Promise<void>` - Learn from user feedback
- `learnUserBehavior(userId: string, action: string, context: any): Promise<void>` - Learn user behavior patterns

### Adaptation Operations
- `adaptToUser(userId: string, domain: string, data: any): Promise<AdaptationStrategy>` - Adapt IDE to user
- `getAdaptationStrategy(userId: string, domain: string): Promise<AdaptationStrategy | undefined>` - Get adaptation strategy
- `predictUserAction(userId: string, context: any): Promise<{action: string; confidence: number}[]>` - Predict user actions

### Learning Model Management
- `createLearningModel(type: string, parameters?: Record<string, any>): Promise<LearningModel>` - Create new learning model
- `updateLearningModel(modelId: string, trainingData: LearningData[]): Promise<LearningModel>` - Train existing model
- `getLearningModel(modelId: string): Promise<LearningModel | undefined>` - Retrieve specific model
- `listLearningModels(): Promise<LearningModel[]>` - List all models

### Personalization Operations
- `personalize(userId: string, preferences: Record<string, any>): Promise<void>` - Set user preferences
- `getPersonalization(userId: string): Promise<Record<string, any>>` - Get user preferences

### Analytics Operations
- `getLearningStats(): Promise<LearningStats>` - Get comprehensive learning statistics
- `getUserBehaviorPatterns(userId: string): Promise<UserBehaviorPattern[]>` - Get user behavior patterns

## Development Status

This package implements Phase 2 of the Theia-OpenCog Integration Roadmap with comprehensive learning and adaptation capabilities.

### Implemented Features ✅
- Enhanced learning algorithms (supervised, unsupervised, reinforcement, adaptive)
- User behavior learning and pattern recognition
- Personalization system with preference management
- Learning model creation, training, and management
- Adaptation strategies for different IDE domains
- Feedback processing and continuous learning
- Behavioral prediction and recommendation system
- Learning analytics and statistics
- Specialized learning and adaptation agents

### Architecture Enhancements ✅
- Extended AtomSpace service with learning capabilities
- Enhanced data types for learning and adaptation
- Learning-specific agents (LearningAdaptationAgent)
- Comprehensive test coverage for learning systems
- Updated examples and documentation

### Future Phases 🚧
- Advanced reasoning engines (Phase 3)
- Sensor-motor systems (Phase 4)
- Production optimization (Phase 5-6)
- Multi-modal cognitive processing
- Distributed reasoning capabilities

## Contributing

This package follows Theia's contribution guidelines. See the main repository documentation for development setup and contribution processes.

## License

Eclipse Public License 2.0 OR GPL-2.0-only WITH Classpath-exception-2.0