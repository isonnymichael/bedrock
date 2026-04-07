export async function generateAntigravity(context) {
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
### Antigravity (Gemini)
📚 **Official Documentation:**
- Rules & GEMINI.md: https://antigravity.google/docs/customize/rules
- Workflows: https://antigravity.google/docs/customize/workflows
- Skills: https://antigravity.google/docs/customize/skills

Refer to the documentation above for the correct file format, structure, and best practices. Generate the following configuration files for Antigravity. Each file must be comprehensive, production-grade, and tailored to the project context below.

**Project Context:**
${intro}

---

#### 1. \`.agents/GEMINI.md\` (Root — Master Guide)
This is the primary instruction file loaded at the start of every Antigravity session. Generate it with the following sections:
- **Project Overview**: A concise 2-3 line summary of the project's purpose, goals, and target audience.
- **Tech Stack**: Explicitly list all languages, frameworks, runtimes, package managers, and key libraries with version constraints (e.g., "Node.js 20+", "Vue 3 with TypeScript 5.x").
- **Architecture & Directory Map**: Describe the project structure with clear responsibilities for each key directory.
- **Development Commands**: List essential commands (build, dev, test, lint, deploy) with exact syntax.
- **Coding Conventions**: Define naming conventions, file organization, import ordering, and error handling strategies.
- **Critical Rules**: Mark non-negotiable rules with \`**IMPORTANT**\` (e.g., "Never commit secrets", "Always validate user input").
- Keep it under 200 lines. Use \`@\` imports to reference detailed documentation files when needed.

#### 2. \`.agents/rules/format.md\` (Code Formatting & Style Rules)
Write highly detailed, enforceable code formatting rules. Include:
- Indentation style and size (tabs vs spaces, width).
- Naming conventions for variables, functions, classes, constants, files, and directories.
- Import/export ordering and grouping rules.
- Maximum line length and line-wrapping preferences.
- Comment style requirements (JSDoc, inline, block, docstrings).
- Language-specific conventions (e.g., TypeScript strict mode, Python PEP8).
- Framework-specific patterns (e.g., Vue composition API structure, Express middleware ordering).
- Example "gold standard" code snippets demonstrating the expected format.

#### 3. \`.agents/rules/testing.md\` (Testing Guidelines & Standards)
Write comprehensive testing rules and standards:
- Recommended test framework and assertion library (e.g., Vitest, Jest, pytest).
- Test file naming conventions and directory structure (e.g., \`__tests__/\`, \`*.test.ts\`, \`*.spec.ts\`).
- Required test coverage thresholds and what areas must be tested.
- Unit test patterns: setup/teardown, mocking strategies, fixture usage.
- Integration and E2E test guidelines if applicable.
- Example test structure showing a well-written, idiomatic test case.

#### 4. \`.agents/rules/security.md\` (Security Guardrails)
Write security-focused rules the agent must always follow:
- Input validation and sanitization requirements.
- Authentication and authorization patterns.
- Secrets management (never hardcode, use environment variables or secret managers).
- Dependency security (audit schedule, version pinning, update strategy).
- Common vulnerability prevention (injection attacks, XSS, CSRF, path traversal).
- File system and network access restrictions.

#### 5. \`.agents/rules/architecture.md\` (Architectural Guidelines)
Write rules governing the project's architecture:
- Separation of concerns and layer boundaries (e.g., controllers should not contain business logic).
- Module dependency rules (what can import what).
- State management patterns and data flow.
- API design conventions (REST, GraphQL, naming, versioning).
- Database access patterns (repository pattern, ORM usage, query optimization).
- Error handling and logging standards.

#### 6. \`.agents/workflows/review.md\` (Code Review Workflow)
Create a reusable workflow with YAML frontmatter (\`description\`) that instructs the agent to:
- Analyze the current changeset or staged files for bugs, security issues, and style violations.
- Check for proper error handling and edge cases.
- Verify test coverage for new or modified code.
- Output a structured review summary with severity levels (critical, warning, info).

#### 7. \`.agents/workflows/docs.md\` (Documentation Workflow)
Create a reusable workflow with YAML frontmatter that instructs the agent to:
- Scan the project for undocumented or poorly documented public APIs and modules.
- Generate or update inline documentation (JSDoc, docstrings, etc.).
- Update the README.md if structural changes are detected.
- Ensure all exported functions and classes have proper type annotations and descriptions.

#### 8. \`.agents/workflows/onboard.md\` (Onboarding Workflow)
Create a reusable workflow that provides a new developer (or agent) with:
- A high-level walkthrough of the codebase architecture.
- Key files and entry points to understand first.
- How to set up the local development environment step by step.
- Common pitfalls and gotchas specific to this project.

#### 9. \`.agents/skills/debug/SKILL.md\` (Debugging Skill)
Create a debugging skill with YAML frontmatter (\`name\`, \`description\`) and instructions for:
- Systematic debugging: reproduce → isolate → diagnose → fix → verify.
- Reading stack traces and error logs effectively.
- Using logging and breakpoints strategically.
- Writing regression tests after fixing bugs.
`;
}
