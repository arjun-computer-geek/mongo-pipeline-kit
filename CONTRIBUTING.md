# Contributing to Mongo Pipeline Kit

Thank you for your interest in contributing to Mongo Pipeline Kit! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### 1. Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/mongo-pipeline-kit.git
   cd mongo-pipeline-kit
   ```

### 2. Setup Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure all tests pass:
   ```bash
   npm test
   ```

### 3. Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following these guidelines:
   - Follow the existing code style
   - Write clear commit messages
   - Add tests for new features
   - Update documentation as needed
   - Ensure all tests pass

3. Format your code:
   ```bash
   npm run format
   ```

### 4. Submitting Changes

1. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a Pull Request (PR) from your fork to the main repository
3. Fill out the PR template with a clear description of your changes
4. Wait for review and address any feedback

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting (using Prettier)
- Write meaningful comments and documentation
- Use meaningful variable and function names

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PRs
- Maintain or improve test coverage

### Documentation

- Update README.md if needed
- Add JSDoc comments for new functions/classes
- Update type definitions if necessary

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the version numbers in package.json following [SemVer](https://semver.org/)
3. The PR will be merged once you have the sign-off of at least one maintainer

## Questions?

Feel free to open an issue for any questions or concerns about contributing.

Thank you for contributing to Mongo Pipeline Kit! 🚀 