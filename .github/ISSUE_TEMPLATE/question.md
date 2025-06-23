---
name: Question
about: Ask a question about mongo-pipeline-kit
title: "[QUESTION] "
labels: ["question", "needs-triage"]
assignees: ["arjun-computer-geek"]
---

## ❓ Question

A clear and concise description of your question.

## 🔍 What I've Tried

A clear and concise description of what you've already tried to solve your problem.

## 📋 Environment Information

- **mongo-pipeline-kit version**: [e.g. 0.3.0]
- **Node.js version**: [e.g. 18.0.0]
- **MongoDB version**: [e.g. 6.0]
- **Operating System**: [e.g. macOS, Windows, Linux]

## 💻 Code Example

```typescript
import { PipelineBuilder } from "mongo-pipeline-kit";

// Your code here
const builder = new PipelineBuilder()
  .match({ status: "active" })
  .group({ _id: "$category", count: { $sum: 1 } });

// What you're trying to achieve
const pipeline = builder.build();
```

## 📚 Documentation References

- [ ] I've checked the README.md
- [ ] I've checked the EXAMPLES.md
- [ ] I've searched existing issues
- [ ] I've checked the MongoDB documentation

## 🎯 Expected Outcome

A clear and concise description of what you're trying to achieve.

## 🔍 Additional Context

Add any other context or screenshots about your question here.

## 📋 Checklist

- [ ] I have searched existing issues and documentation
- [ ] I have provided a clear code example
- [ ] I have described what I'm trying to achieve
- [ ] This is a question about mongo-pipeline-kit usage
