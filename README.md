# Mongo Pipeline Kit

A feature-rich MongoDB pipeline builder kit for creating, reusing, and managing aggregation pipelines with ease.

## Features

- 🏗️ Object-oriented pipeline building
- 🔄 Reusable pipeline components
- 🎯 Type-safe pipeline construction
- 📦 Pipeline composition and chaining
- 🔍 Built-in pipeline validation
- 📝 Comprehensive pipeline documentation
- 🧩 Modular and extensible design

## Installation

```bash
npm install mongo-pipeline-kit
```

## Quick Start

```typescript
import { PipelineBuilder } from 'mongo-pipeline-kit';

// Create a new pipeline builder
const builder = new PipelineBuilder();

// Add stages to your pipeline
const pipeline = builder
  .match({ status: 'active' })
  .group({
    _id: '$category',
    total: { $sum: 1 },
    items: { $push: '$$ROOT' }
  })
  .sort({ total: -1 })
  .limit(10)
  .build();

// Use the pipeline with MongoDB
const results = await collection.aggregate(pipeline).toArray();
```

## Advanced Usage

### Creating Reusable Pipeline Components

```typescript
import { PipelineBuilder, PipelineStage } from 'mongo-pipeline-kit';

// Define a reusable pipeline component
const activeUsersStage: PipelineStage = {
  $match: {
    status: 'active',
    lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  }
};

// Use the component in multiple pipelines
const userStatsPipeline = builder
  .addStage(activeUsersStage)
  .group({
    _id: '$role',
    count: { $sum: 1 }
  })
  .build();
```

### Pipeline Composition

```typescript
import { PipelineBuilder, PipelineComposer } from 'mongo-pipeline-kit';

const composer = new PipelineComposer();

// Create separate pipeline segments
const filteringPipeline = builder
  .match({ status: 'active' })
  .build();

const aggregationPipeline = builder
  .group({
    _id: '$category',
    total: { $sum: '$amount' }
  })
  .build();

// Compose pipelines
const finalPipeline = composer
  .compose(filteringPipeline, aggregationPipeline)
  .build();
```

## API Documentation

### PipelineBuilder

The main class for building MongoDB aggregation pipelines.

#### Methods

- `match(condition: object)`: Add a $match stage
- `group(expression: object)`: Add a $group stage
- `sort(sort: object)`: Add a $sort stage
- `limit(n: number)`: Add a $limit stage
- `skip(n: number)`: Add a $skip stage
- `project(projection: object)`: Add a $project stage
- `addStage(stage: PipelineStage)`: Add a custom pipeline stage
- `build()`: Build the final pipeline array

### PipelineComposer

Utility class for composing and reusing pipeline segments.

#### Methods

- `compose(...pipelines: Pipeline[])`: Compose multiple pipelines
- `extend(basePipeline: Pipeline, extension: Pipeline)`: Extend an existing pipeline
- `validate(pipeline: Pipeline)`: Validate a pipeline structure

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 