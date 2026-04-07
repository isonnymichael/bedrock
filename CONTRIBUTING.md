# Contributing to Bedrock

Thank you for your interest in contributing to Bedrock! 🎉 This document outlines the process for contributing and helps you get started quickly.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Adding a New AI Tool Generator](#adding-a-new-ai-tool-generator)
- [Commit Convention](#commit-convention)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something useful together.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/bedrock.git
   cd bedrock
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Test** your changes:
   ```bash
   npm run init
   ```

---

## How to Contribute

### Adding a New AI Tool Generator

The most impactful contribution you can make is adding support for a new AI coding assistant. Here's how:

1. **Create the generator file** at `src/generators/<tool-name>.js`:

   ```js
   export async function generate<ToolName>(context) {
     let intro;
     if (context.isFresh) {
       intro = `The project is about:\n${context.projectAbout}`;
     } else {
       intro = `The existing project structure is:\n\`\`\`\n${context.projectStructure}\n\`\`\``;
       if (context.projectAbout) {
         intro += `\n\nThe project is about:\n${context.projectAbout}`;
       }
     }

     return `
   ### <ToolName>
   📚 **Official Documentation:**
   - Link to rules/config docs

   **Project Context:**
   ${intro}

   ---

   #### 1. \`<config-file>\` (Master Guide)
   ...
   `;
   }
   ```

2. **Register it** in `src/commands/init.js`:
   - Import the generator
   - Add a `{ title, value }` entry to the `choices` array
   - Add a `if (tool === '<value>') ...` branch

3. **Document it** in the README's supported tools table.

### The `context` Object

Every generator receives a `context` object:

```js
{
  isFresh: Boolean,        // true if no existing project files detected
  projectAbout: String,    // user-provided description (may be empty)
  projectStructure: String // scanned directory tree (existing projects only)
}
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description
```

| Type | When to use |
|------|------------|
| `feat` | New feature or generator |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore` | Tooling, deps, config changes |

**Examples:**
```
feat(generator): add Windsurf IDE generator
fix(init): handle empty project directory correctly
docs(readme): update supported tools table
```

---

## Pull Request Guidelines

- Keep PRs **focused** — one feature or fix per PR
- Fill out the PR description with **what** changed and **why**
- Ensure the CLI runs without errors: `npm run init`
- Reference any related issues with `Closes #<issue-number>`
- PRs must be reviewed and approved before merging

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/your-username/bedrock/issues/new) and include:

- Your OS and Node.js version
- The command you ran
- The full error output
- Steps to reproduce

---

## Requesting Features

Open a [GitHub Issue](https://github.com/your-username/bedrock/issues/new) with:

- Which AI tool you'd like support for (with a link to its docs)
- A brief description of what config files / structure it expects
- Any context on why it would be valuable

---

## License

By contributing to Bedrock, you agree that your contributions will be licensed under the [GNU General Public License v3.0](./LICENSE).
