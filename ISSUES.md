# Issue Management Guide

This guide helps you understand how to report issues, request features, and get support for mongo-pipeline-kit.

## 🚀 Quick Start

### Before Creating an Issue

1. **Check Documentation**: Review the [README.md](README.md) and [EXAMPLES.md](EXAMPLES.md)
2. **Search Existing Issues**: Use the search bar to find similar issues
3. **Check Previous Questions**: Look for similar questions in existing issues

### Issue Types

We have three main types of issues:

- 🐛 **Bug Reports**: Something isn't working as expected
- 🚀 **Feature Requests**: Suggest new functionality
- ❓ **Questions**: Ask for help or clarification

## 🐛 Reporting Bugs

### What to Include

- **Clear Description**: What happened vs. what you expected
- **Steps to Reproduce**: Step-by-step instructions
- **Environment Info**: Node.js, MongoDB, OS versions
- **Code Example**: Minimal code that reproduces the issue
- **Error Messages**: Full error stack traces

### Bug Report Template

````markdown
## Bug Description

Brief description of the issue

## Steps to Reproduce

1. Install mongo-pipeline-kit@0.3.0
2. Run this code:

```typescript
import { PipelineBuilder } from "mongo-pipeline-kit";
const builder = new PipelineBuilder().match({ status: "active" });
```
````

3. See error: [paste error here]

## Expected vs Actual

- Expected: Pipeline should build successfully
- Actual: Throws TypeError

## Environment

- mongo-pipeline-kit: 0.3.0
- Node.js: 18.0.0
- MongoDB: 6.0
- OS: macOS

````

## 🚀 Feature Requests

### What to Include

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Use Cases**: Real-world examples
- **Impact**: Who benefits and how much?

### Feature Request Template

```markdown
## Feature Description
Add support for pipeline templates

## Problem Statement
Users often create similar pipelines and have to copy-paste code

## Proposed Solution
Add a template system where users can save and reuse common pipeline patterns

## Use Cases
```typescript
// Template: User Analytics
const userAnalyticsTemplate = PipelineBuilder.template('user-analytics', {
  match: { status: 'active' },
  group: { _id: '$category', count: { $sum: 1 } }
});

// Usage
const pipeline = userAnalyticsTemplate.build();
````

## Impact

- High priority for advanced users
- Medium complexity
- Benefits all users who create similar pipelines

````

## ❓ Asking Questions

### What to Include

- **Clear Question**: What are you trying to achieve?
- **What You've Tried**: Show your attempts
- **Code Example**: Your current implementation
- **Expected Outcome**: What you want to happen

### Question Template

```markdown
## Question
How do I export a pipeline to JSON with custom metadata?

## What I've Tried
I tried using `builder.toJSON()` but it doesn't include metadata

## Code Example
```typescript
const builder = new PipelineBuilder()
  .match({ status: 'active' })
  .group({ _id: '$category', count: { $sum: 1 } });

// I want to add metadata like description, author, etc.
const json = builder.toJSON(); // This doesn't include metadata
````

## Expected Outcome

I want to export the pipeline with additional information like:

- Description
- Author
- Version
- Tags

```

## 📋 Issue Guidelines

### Do's ✅

- Use the appropriate issue template
- Provide clear, reproducible examples
- Include environment information
- Search for duplicates first
- Be respectful and constructive
- Use code blocks for code examples
- Tag issues appropriately

### Don'ts ❌

- Don't create blank issues
- Don't report issues without context
- Don't ask for help without showing your code
- Don't demand immediate fixes
- Don't be rude or demanding
- Don't create duplicate issues

## 🏷️ Issue Labels

We use the following labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature request
- `question` - Help needed
- `documentation` - Documentation improvements
- `good first issue` - Good for new contributors
- `help wanted` - Looking for contributors
- `needs-triage` - Needs review
- `wontfix` - Won't be implemented
- `duplicate` - Duplicate of another issue

## 🔄 Issue Lifecycle

1. **Created** - Issue is submitted
2. **Needs Triage** - Waiting for review
3. **In Progress** - Being worked on
4. **Needs Info** - Waiting for more details
5. **Resolved** - Issue is fixed/implemented
6. **Closed** - Issue is resolved

## 📞 Getting Help

### Support Channels

1. **GitHub Issues**: For bugs, feature requests, and questions
2. **Email**: arjun2000raj@gmail.com (for private matters)
3. **Documentation**: README.md and EXAMPLES.md
4. **NPM Package Page**: For general questions and reviews

### Response Times

- **Critical Bugs**: Within 24-48 hours
- **Feature Requests**: Within 1 week
- **Questions**: Within 2-3 days
- **Documentation**: Within 1 week

## 🤝 Contributing to Issues

### How to Help

- **Answer Questions**: Help other users in discussions
- **Reproduce Bugs**: Test reported issues
- **Suggest Solutions**: Provide workarounds
- **Improve Documentation**: Fix typos or clarify examples

### Before Contributing

- Read the [Contributing Guide](CONTRIBUTING.md)
- Follow the code of conduct
- Test your changes
- Provide clear explanations

## 📊 Issue Statistics

We track issue metrics to improve the project:

- **Response Time**: Average time to first response
- **Resolution Time**: Average time to close issues
- **Issue Types**: Distribution of bugs vs features vs questions
- **Contributor Activity**: Who's helping with issues

## 🔗 Related Links

- [README.md](README.md) - Main documentation
- [EXAMPLES.md](EXAMPLES.md) - Usage examples
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [GitHub Issues](https://github.com/arjun-computer-geek/mongo-pipeline-kit/issues)
- [NPM Package](https://www.npmjs.com/package/mongo-pipeline-kit)

---

**Thank you for helping improve mongo-pipeline-kit!** 🎉
```
