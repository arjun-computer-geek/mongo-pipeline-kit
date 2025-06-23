# MongoDB Pipeline Kit - Enhanced Examples

This document demonstrates the enhanced features of the mongo-pipeline-kit, including JSON export/import functionality and utility methods.

## JSON Export/Import Examples

### Basic JSON Export

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
// Output:
// [
//   {
//     "$match": {
//       "status": "active"
//     }
//   },
//   {
//     "$group": {
//       "_id": "$category",
//       "count": {
//         "$sum": 1
//       }
//     }
//   },
//   {
//     "$sort": {
//       "count": -1
//     }
//   },
//   {
//     "$limit": 10
//   }
// ]

// Get plain object
const pipelineObject = builder.toObject();
console.log(pipelineObject);
// Output: Array of pipeline stages
```

### Export with Metadata

```typescript
const exportData = builder.exportWithMetadata({
  description: "Active users by category",
  author: "John Doe",
  version: "1.0.0",
});

console.log(exportData);
// Output:
// {
//   pipeline: [...],
//   metadata: {
//     stageCount: 4,
//     createdAt: "2024-01-15T10:30:00.000Z",
//     description: "Active users by category",
//     author: "John Doe",
//     version: "1.0.0"
//   }
// }
```

### JSON Import

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

// Or use with PipelineComposer
const composer = new PipelineComposer();
composer.compose(pipeline);
```

## Pipeline Utilities Examples

### Pipeline Statistics

```typescript
import { PipelineUtils } from "mongo-pipeline-kit";

const pipeline = [
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 },
];

const stats = PipelineUtils.getStats(pipeline);
console.log(stats);
// Output:
// {
//   stageCount: 4,
//   stageTypes: { '$match': 1, '$group': 1, '$sort': 1, '$limit': 1 },
//   totalSize: 156,
//   estimatedComplexity: 6
// }
```

### Pipeline Description

```typescript
const description = PipelineUtils.describe(pipeline);
console.log(description);
// Output:
// Pipeline Description:
// - Total Stages: 4
// - Stage Types: $match(1), $group(1), $sort(1), $limit(1)
// - Estimated Complexity: 6
// - Total Size: 156 characters
//
// Stages:
// 1. $match
// 2. $group
// 3. $sort
// 4. $limit
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
// Output:
// {
//   areEqual: false,
//   differences: {
//     stageCount: { p1: 2, p2: 3 },
//     stageTypes: { p1: { '$match': 1, '$group': 1 }, p2: { '$match': 1, '$group': 1, '$sort': 1 } },
//     commonStages: 2
//   }
// }
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

## PipelineComposer with JSON

```typescript
import { PipelineComposer } from "mongo-pipeline-kit";

const composer = new PipelineComposer().compose(
  [{ $match: { status: "active" } }],
  [{ $group: { _id: "$category", count: { $sum: 1 } } }],
  [{ $sort: { count: -1 } }]
);

// Get JSON representation
const jsonString = composer.toJSON(true);
console.log(jsonString);

// Export with metadata
const exportData = composer.exportWithMetadata({
  description: "Composed pipeline for user analytics",
  tags: ["analytics", "users"],
});
```

## Validation Examples

```typescript
import { PipelineUtils } from "mongo-pipeline-kit";

const pipeline = [
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
];

// Validate pipeline
try {
  PipelineUtils.validate(pipeline);
  console.log("Pipeline is valid");
} catch (error) {
  console.error("Pipeline validation failed:", error.message);
}

// Validate with custom options
try {
  PipelineUtils.validate(pipeline, {
    strict: false,
    allowEmpty: false,
    maxStages: 5,
  });
  console.log("Pipeline is valid with custom options");
} catch (error) {
  console.error("Pipeline validation failed:", error.message);
}
```

## String Representation

```typescript
const builder = new PipelineBuilder()
  .match({ status: "active" })
  .group({ _id: "$category", count: { $sum: 1 } })
  .sort({ count: -1 });

console.log(builder.toString());
// Output:
// Pipeline with 3 stages:
// 1. $match
// 2. $group
// 3. $sort

const composer = new PipelineComposer().compose([
  { $match: { status: "active" } },
]);

console.log(composer.toString());
// Output:
// Composed Pipeline with 1 stages:
// 1. $match
```

## Complete Workflow Example

```typescript
import { PipelineBuilder, PipelineUtils } from "mongo-pipeline-kit";

// Build a complex pipeline
const builder = new PipelineBuilder()
  .match({ status: "active", age: { $gte: 18 } })
  .lookup({
    from: "categories",
    localField: "categoryId",
    foreignField: "_id",
    as: "category",
  })
  .unwind("$category")
  .group({
    _id: "$category.name",
    totalUsers: { $sum: 1 },
    avgAge: { $avg: "$age" },
  })
  .sort({ totalUsers: -1 })
  .limit(10);

// Get pipeline statistics
const stats = PipelineUtils.getStats(builder.toObject());
console.log("Pipeline complexity:", stats.estimatedComplexity);

// Export as JSON with metadata
const exportData = builder.exportWithMetadata({
  description: "User analytics by category",
  complexity: stats.estimatedComplexity,
  tags: ["analytics", "users", "categories"],
});

// Save to file (in Node.js environment)
const fs = require("fs");
fs.writeFileSync("pipeline.json", JSON.stringify(exportData, null, 2));

// Later, load from file
const loadedData = JSON.parse(fs.readFileSync("pipeline.json", "utf8"));
const loadedPipeline = loadedData.pipeline;

// Validate loaded pipeline
PipelineUtils.validate(loadedPipeline);
console.log("Loaded pipeline is valid");
```

These examples demonstrate the enhanced functionality of the mongo-pipeline-kit, making it easier to work with MongoDB aggregation pipelines in JSON format and providing powerful utility functions for pipeline manipulation and analysis.
