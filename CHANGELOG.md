# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
