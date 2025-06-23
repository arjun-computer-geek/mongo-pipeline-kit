# Mongo Pipeline Kit

A feature-rich MongoDB pipeline builder kit for creating, reusing, and managing aggregation pipelines with ease. Now with enhanced JSON support, pipeline utilities, and advanced analysis capabilities.

## Features

- 🏗️ Object-oriented pipeline building
- 🔄 Reusable pipeline components
- 🎯 Type-safe pipeline construction
- 📦 Pipeline composition and chaining
- 🔍 Built-in pipeline validation
- 📝 Comprehensive pipeline documentation
- 🧩 Modular and extensible design
- 📄 **NEW**: JSON export/import functionality
- 🛠️ **NEW**: Advanced pipeline utilities and analysis
- 📊 **NEW**: Pipeline statistics and complexity estimation
- 🔄 **NEW**: Pipeline comparison and manipulation tools

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

## JSON Export/Import

### Export Pipeline to JSON

```typescript
import { PipelineBuilder } from "mongo-pipeline-kit";

const builder = new PipelineBuilder()
  .match({ status: "active" })
  .group({ _id: "$category", count: { $sum: 1 } })
  .sort({ count: -1 })
  .limit(10);

// Get JSON string (compact)
const jsonString = builder.toJSON();
console.log(jsonString);
// Output: [{"$match":{"status":"active"}},{"$group":{"_id":"$category","count":{"$sum":1}}},{"$sort":{"count":-1}},{"$limit":10}]

// Get JSON string (pretty formatted)
const prettyJson = builder.toJSON(true);
console.log(prettyJson);
// Output: Formatted JSON with indentation

// Export with metadata
const exportData = builder.exportWithMetadata({
  description: "Active users by category",
  author: "John Doe",
  version: "1.0.0",
});
```

### Import Pipeline from JSON

```typescript
import { PipelineUtils } from "mongo-pipeline-kit";

const jsonString = `[
  {"$match": {"status": "active"}},
  {"$group": {"_id": "$category", "count": {"$sum": 1}}},
  {"$sort": {"count": -1}},
  {"$limit": 10}
]`;

// Parse JSON string to pipeline
const pipeline = PipelineUtils.fromJSON(jsonString);

// Use with PipelineBuilder
const builder = new PipelineBuilder();
pipeline.forEach((stage) => builder.addStage(stage));
```

## Pipeline Utilities

### Pipeline Analysis

```typescript
import { PipelineUtils } from "mongo-pipeline-kit";

const pipeline = [
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 },
];

// Get pipeline statistics
const stats = PipelineUtils.getStats(pipeline);
console.log(stats);
// Output:
// {
//   stageCount: 4,
//   stageTypes: { '$match': 1, '$group': 1, '$sort': 1, '$limit': 1 },
//   totalSize: 156,
//   estimatedComplexity: 6
// }

// Get human-readable description
const description = PipelineUtils.describe(pipeline);
console.log(description);
```

### Pipeline Manipulation

```typescript
// Clone a pipeline
const clonedPipeline = PipelineUtils.clone(pipeline);

// Filter stages by type
const matchStages = PipelineUtils.filterByStageType(pipeline, "$match");

// Remove specific stage type
const pipelineWithoutLimit = PipelineUtils.removeStageType(pipeline, "$limit");

// Insert a stage at specific position
const newPipeline = PipelineUtils.insertStage(pipeline, 1, {
  $addFields: { processed: true },
});

// Replace a stage
const modifiedPipeline = PipelineUtils.replaceStage(pipeline, 0, {
  $match: { status: "inactive" },
});
```

### Pipeline Comparison

```typescript
const pipeline1 = [
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
];

const pipeline2 = [
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
];

const comparison = PipelineUtils.compare(pipeline1, pipeline2);
console.log(comparison);
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

// Export composed pipeline with metadata
const exportData = composer.exportWithMetadata({
  description: "Composed pipeline for user analytics",
  tags: ["analytics", "users"],
});
```

## API Documentation

### PipelineBuilder

The main class for building MongoDB aggregation pipelines.

#### Core Methods

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

#### New JSON Export Methods

- `toJSON(pretty?: boolean)`: Convert pipeline to JSON string
- `toObject()`: Get pipeline as plain object
- `exportWithMetadata(metadata)`: Export pipeline with additional metadata
- `toString()`: Get human-readable string representation

#### Pipeline Management Methods

- `clear()`: Clear all stages from the pipeline
- `getStageCount()`: Get the current number of stages
- `getStage(index: number)`: Get a specific stage
- `replaceStage(index: number, stage: PipelineStage)`: Replace a stage
- `removeStage(index: number)`: Remove a stage

### PipelineComposer

Utility class for composing and reusing pipeline segments.

#### Methods

- `compose(...pipelines: Pipeline[])`: Compose multiple pipelines
- `extend(basePipeline: Pipeline, extension: Pipeline)`: Extend an existing pipeline
- `validate(pipeline: Pipeline)`: Validate a pipeline structure
- `toJSON(pretty?: boolean)`: Convert composed pipeline to JSON
- `toObject()`: Get composed pipeline as plain object
- `exportWithMetadata(metadata)`: Export with metadata
- `toString()`: Get human-readable representation
- `hasStage(operator: string)`: Check if pipeline contains specific stage type
- `getStagesByType(operator: string)`: Get all stages of a specific type

### PipelineUtils

Static utility class for pipeline operations and analysis.

#### Methods

- `fromJSON(jsonString: string)`: Parse JSON string to pipeline
- `toJSON(pipeline: Pipeline, pretty?: boolean)`: Convert pipeline to JSON
- `validate(pipeline: Pipeline, options?)`: Validate pipeline structure
- `clone(pipeline: Pipeline)`: Deep copy pipeline
- `getStats(pipeline: Pipeline)`: Get pipeline statistics
- `describe(pipeline: Pipeline)`: Get human-readable description
- `compare(pipeline1: Pipeline, pipeline2: Pipeline)`: Compare two pipelines
- `filterByStageType(pipeline: Pipeline, operator: string)`: Filter stages by type
- `removeStageType(pipeline: Pipeline, operator: string)`: Remove stages by type
- `insertStage(pipeline: Pipeline, index: number, stage: PipelineStage)`: Insert stage
- `replaceStage(pipeline: Pipeline, index: number, stage: PipelineStage)`: Replace stage

## Examples

For comprehensive examples of all features, see [EXAMPLES.md](EXAMPLES.md).

## 🐛 Issues & Support

### Getting Help

If you encounter any issues or need help with mongo-pipeline-kit:

1. **📚 Check Documentation**: Review the [README.md](README.md) and [EXAMPLES.md](EXAMPLES.md)
2. **🔍 Search Issues**: Look for similar issues in [GitHub Issues](https://github.com/arjun-computer-geek/mongo-pipeline-kit/issues)
3. **💬 Ask Questions**: Use [GitHub Discussions](https://github.com/arjun-computer-geek/mongo-pipeline-kit/discussions) for general questions
4. **🐛 Report Bugs**: Create a bug report using our [issue template](https://github.com/arjun-computer-geek/mongo-pipeline-kit/issues/new?template=bug_report.md)
5. **🚀 Request Features**: Suggest new features using our [feature request template](https://github.com/arjun-computer-geek/mongo-pipeline-kit/issues/new?template=feature_request.md)
6. **📧 Email Support**: Contact arjun2000raj@gmail.com for private matters

### Issue Guidelines

- **Use Templates**: We provide issue templates for bugs, features, and questions
- **Include Details**: Provide environment info, code examples, and error messages
- **Be Specific**: Describe what you're trying to achieve and what went wrong
- **Search First**: Check existing issues to avoid duplicates

For detailed information about reporting issues, see [ISSUES.md](ISSUES.md).

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## Publishing

For information about publishing new versions, please refer to our [Publishing Guide](PUBLISHING.md).

## License

MIT
