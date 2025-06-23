# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2024-01-15

### Added

- **JSON Export/Import Functionality**

  - `toJSON(pretty?: boolean)` method to PipelineBuilder and PipelineComposer for JSON string export
  - `toObject()` method to get pipeline as plain object
  - `exportWithMetadata(metadata)` method to export pipeline with additional metadata
  - `toString()` method for human-readable string representation
  - `fromJSON(jsonString: string)` static method in PipelineUtils for JSON parsing

- **PipelineUtils Class**

  - Static utility class for advanced pipeline operations
  - `getStats(pipeline)` for pipeline statistics and complexity estimation
  - `describe(pipeline)` for human-readable pipeline descriptions
  - `compare(pipeline1, pipeline2)` for pipeline comparison
  - `clone(pipeline)` for deep copying pipelines
  - `validate(pipeline, options)` for comprehensive pipeline validation
  - `filterByStageType(pipeline, operator)` for filtering stages by type
  - `removeStageType(pipeline, operator)` for removing stages by type
  - `insertStage(pipeline, index, stage)` for inserting stages at specific positions
  - `replaceStage(pipeline, index, stage)` for replacing stages

- **Enhanced PipelineComposer**

  - JSON export methods (`toJSON`, `toObject`, `exportWithMetadata`)
  - String representation method (`toString`)
  - `hasStage(operator)` method to check for specific stage types
  - `getStagesByType(operator)` method to get all stages of a specific type

- **Pipeline Analysis Features**

  - Pipeline complexity estimation based on stage types
  - Stage type counting and analysis
  - Total size calculation
  - Metadata support with timestamps and custom fields

- **Comprehensive Examples**
  - Added EXAMPLES.md with detailed usage examples
  - JSON export/import examples
  - Pipeline manipulation examples
  - Pipeline comparison examples
  - Complete workflow examples

### Changed

- Enhanced README.md with new features documentation
- Updated API documentation to include new methods
- Improved type safety and error handling

### Fixed

- Enhanced error messages for better debugging
- Improved validation logic in PipelineUtils

## [0.2.1] - 2024-01-10

### Added

- Comprehensive MongoDB aggregation pipeline methods to `PipelineBuilder`, including:
  - `$addFields`
  - `$bucket`
  - `$bucketAuto`
  - `$collStats`
  - `$count`
  - `$facet`
  - `$geoNear`
  - `$graphLookup`
  - `$indexStats`
  - `$lookup`
  - `$merge`
  - `$out`
  - `$redact`
  - `$replaceRoot`
  - `$replaceWith`
  - `$sample`
  - `$setWindowFields`
  - `$sortByCount`
  - `$unionWith`
  - `$unset`
  - `$unwind`
- Repository, bugs, and homepage links to `package.json`.
- `CONTRIBUTING.md` to the `files` array in `package.json`.
- `CHANGELOG.md` to track project changes.

### Changed

- Alphabetized the methods in `PipelineBuilder.ts` for better organization.

### Fixed

- A 404 error for `CONTRIBUTING.md` on the npm package page.
- A bug in the `sortByCount` method.
