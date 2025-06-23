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
import { PipelineBuilder } from "mongo-pipeline-kit";

// Create a new pipeline builder
const builder = new PipelineBuilder();

// Add stages to your pipeline
const pipeline = builder
  .match({ status: "active" })
  .group({
    _id: "$category",
    total: { $sum: 1 },
    items: { $push: "$$ROOT" },
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
import { PipelineBuilder, PipelineStage } from "mongo-pipeline-kit";

// Define a reusable pipeline component
const activeUsersStage: PipelineStage = {
  $match: {
    status: "active",
    lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  },
};

// Use the component in multiple pipelines
const userStatsPipeline = builder
  .addStage(activeUsersStage)
  .group({
    _id: "$role",
    count: { $sum: 1 },
  })
  .build();
```

### Pipeline Composition

```typescript
import { PipelineBuilder, PipelineComposer } from "mongo-pipeline-kit";

const composer = new PipelineComposer();

// Create separate pipeline segments
const filteringPipeline = builder.match({ status: "active" }).build();

const aggregationPipeline = builder
  .group({
    _id: "$category",
    total: { $sum: "$amount" },
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

- `addFields(fields: object)`: Add a `$addFields` stage
- `addStage(stage: PipelineStage)`: Add a custom pipeline stage
- `bucket(options: object)`: Add a `$bucket` stage
- `bucketAuto(options: object)`: Add a `$bucketAuto` stage
- `build()`: Build the final pipeline array
- `collStats(options: object)`: Add a `$collStats` stage
- `count(fieldName: string)`: Add a `$count` stage
- `facet(options: object)`: Add a `$facet` stage
- `geoNear(options: object)`: Add a `$geoNear` stage
- `graphLookup(options: object)`: Add a `$graphLookup` stage
- `group(expression: object)`: Add a `$group` stage
- `indexStats(options: object)`: Add a `$indexStats` stage
- `limit(n: number)`: Add a `$limit` stage
- `lookup(options: object)`: Add a `$lookup` stage
- `match(condition: object)`: Add a `$match` stage
- `merge(options: object)`: Add a `$merge` stage
- `out(collection: string | object)`: Add an `$out` stage
- `project(projection: object)`: Add a `$project` stage
- `redact(expression: object)`: Add a `$redact` stage
- `replaceRoot(newRoot: object)`: Add a `$replaceRoot` stage
- `replaceWith(newRoot: object)`: Add a `$replaceWith` stage
- `sample(options: { size: number })`: Add a `$sample` stage
- `setWindowFields(options: object)`: Add a `$setWindowFields` stage
- `skip(n: number)`: Add a `$skip` stage
- `sort(sort: object)`: Add a `$sort` stage
- `sortByCount(expression: any)`: Add a `$sortByCount` stage
- `unionWith(options: string | object)`: Add a `$unionWith` stage
- `unset(fields: string | string[])`: Add an `$unset` stage
- `unwind(field: string | object)`: Add a `$unwind` stage

### PipelineComposer

Utility class for composing and reusing pipeline segments.

#### Methods

- `compose(...pipelines: Pipeline[])`: Compose multiple pipelines
- `extend(basePipeline: Pipeline, extension: Pipeline)`: Extend an existing pipeline
- `validate(pipeline: Pipeline)`: Validate a pipeline structure

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## Publishing

For information about publishing new versions, please refer to our [Publishing Guide](PUBLISHING.md).

## License

MIT
