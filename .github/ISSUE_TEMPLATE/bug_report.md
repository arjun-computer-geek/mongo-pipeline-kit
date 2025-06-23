---
name: Bug report
about: Create a report to help us improve mongo-pipeline-kit
title: "[BUG] "
labels: ["bug", "needs-triage"]
assignees: ["arjun-computer-geek"]
---

## 🐛 Bug Description

A clear and concise description of what the bug is.

## 🔄 Steps to Reproduce

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## ✅ Expected Behavior

A clear and concise description of what you expected to happen.

## ❌ Actual Behavior

A clear and concise description of what actually happened.

## 📋 Environment Information

- **mongo-pipeline-kit version**: [e.g. 0.3.0]
- **Node.js version**: [e.g. 18.0.0]
- **MongoDB version**: [e.g. 6.0]
- **Operating System**: [e.g. macOS, Windows, Linux]
- **Package Manager**: [e.g. npm, yarn, pnpm]

## 💻 Code Example

```typescript
import { PipelineBuilder } from "mongo-pipeline-kit";

// Your code here that reproduces the bug
const builder = new PipelineBuilder()
  .match({ status: "active" })
  .group({ _id: "$category", count: { $sum: 1 } });

// What you're trying to do
const pipeline = builder.build();
```

## 📝 Error Messages

```
Paste any error messages or stack traces here
```

## 🔍 Additional Context

Add any other context about the problem here, such as:

- Screenshots if applicable
- Related issues
- Workarounds you've tried

## 📋 Checklist

- [ ] I have searched existing issues to avoid duplicates
- [ ] I have provided all the requested information
- [ ] I can reproduce this issue consistently
- [ ] This is a bug in mongo-pipeline-kit, not in my code
