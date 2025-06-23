# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.3] - 2024-01-15

### Added

- **GitHub Sponsors Integration**: Now fully active and working at https://github.com/sponsors/arjun-computer-geek
- **FUNDING.md**: Updated funding page with active sponsorship link
- **Sponsorship Benefits**: Clear explanation of how sponsorships help the project

### Changed

- Updated package.json with working GitHub Sponsors funding link
- Enhanced FUNDING.md with active sponsorship information
- Improved funding configuration for better user experience

### Fixed

- **Funding Link**: Now properly redirects to active GitHub Sponsors page
- **Sponsorship Flow**: Users can now sponsor the project directly through GitHub

## [0.3.2] - 2024-01-15

### Fixed

- **404 Error Fix**: Removed GitHub Discussions links that were causing 404 errors
- **Support Channel Improvements**: Updated all documentation to use working support channels
- **Alternative Support**: Added NPM package page as alternative support channel

### Changed

- Updated issue templates to remove Discussions references
- Enhanced README.md with working support links
- Updated GitHub Actions workflow with alternative support channels
- Replaced `npm run discussions` with `npm run npm` for NPM package access
- Added ENABLE_DISCUSSIONS.md guide for manual setup

### Added

- **ENABLE_DISCUSSIONS.md**: Guide for manually enabling GitHub Discussions
- **NPM Package Links**: Direct links to NPM package for reviews and feedback
- **Improved Support Flow**: Better guidance for users seeking help

## [0.3.1] - 2024-01-15

### Added

- **Issue Management System**
  - GitHub issue templates for bugs, features, and questions
  - Comprehensive ISSUES.md guide for issue reporting
  - GitHub Actions workflow for automated issue management
  - Enhanced package.json with npm-specific issue tracking fields
  - Support for GitHub Discussions and email support
  - Auto-labeling and welcome messages for new issues
  - NPM scripts for quick access to issues, discussions, and docs

### Changed

- Enhanced README.md with issue reporting section and support information
- Enhanced package.json with author information, funding, and engine requirements
- Added new keywords for better npm discoverability
- Improved issue tracking with email support in bugs field

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

- **Issue Management System**
  - GitHub issue templates for bugs, features, and questions
  - Comprehensive ISSUES.md guide for issue reporting
  - GitHub Actions workflow for automated issue management
  - Enhanced package.json with npm-specific issue tracking fields
  - Support for GitHub Discussions and email support
  - Auto-labeling and welcome messages for new issues

### Changed

- Enhanced README.md with new features documentation and issue reporting section
- Updated API documentation to include new methods
- Improved type safety and error handling
- Enhanced package.json with author information, funding, and engine requirements
- Added new keywords for better npm discoverability

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
