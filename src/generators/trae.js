export async function generateTrae(context) {
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
### Trae
📚 **Official Documentation:**
- Rules: https://docs.trae.ai/ide/rules
- Agents: https://docs.trae.ai/ide/agent
- MCP Configuration: https://docs.trae.ai/ide/model-context-protocol

Refer to the documentation above for the correct file format, structure, and best practices. Generate the following configuration files for Trae IDE. Each file must be comprehensive, production-grade, and tailored to the project context below.

**Project Context:**
${intro}

---

#### 1. \`AGENTS.md\` (Root — Master Guide)
This is the primary behavioral guidance file loaded by Trae agents. Generate it with the following sections:
- **Project Overview**: A concise 2-3 line summary of the project's purpose, goals, and target audience.
- **Tech Stack**: Explicitly list all languages, frameworks, runtimes, package managers, and key libraries with version constraints (e.g., "Node.js 20+", "React 18 with TypeScript 5.x").
- **Architecture & Directory Map**: Describe the project structure with clear responsibilities for each key directory.
- **Development Commands**: List essential commands (build, dev, test, lint, deploy) with exact syntax.
- **Coding Conventions**: Define naming conventions, file organization, import ordering, and error handling strategies.
- **Critical Rules**: Mark non-negotiable rules clearly (e.g., "Never commit secrets", "Always validate user input").
- Keep it focused and under 200 lines.

#### 2. \`.trae/rules/coding_style.md\` (Code Formatting & Style Rules)
Write highly detailed, enforceable code formatting rules. Include:
- Indentation style and size (tabs vs spaces, width).
- Naming conventions for variables, functions, classes, constants, files, and directories.
- Import/export ordering and grouping rules.
- Maximum line length and line-wrapping preferences.
- Comment style requirements (JSDoc, inline, block, docstrings).
- Language-specific conventions (e.g., TypeScript strict mode, Python PEP8).
- Framework-specific patterns (e.g., React component structure, Vue composition API).
- Example "gold standard" code snippets demonstrating the expected format.

#### 3. \`.trae/rules/testing.md\` (Testing Guidelines & Standards)
Write comprehensive testing rules and standards:
- Recommended test framework and assertion library (e.g., Vitest, Jest, pytest).
- Test file naming conventions and directory structure (e.g., \`__tests__/\`, \`*.test.ts\`, \`*.spec.ts\`).
- Required test coverage thresholds and what areas must be tested.
- Unit test patterns: setup/teardown, mocking strategies, fixture usage.
- Integration and E2E test guidelines if applicable.
- Example test structure showing a well-written, idiomatic test case.

#### 4. \`.trae/rules/security.md\` (Security Guardrails)
Write security-focused rules the agent must always follow:
- Input validation and sanitization requirements.
- Authentication and authorization patterns.
- Secrets management (never hardcode, use environment variables).
- Dependency security (audit schedule, version pinning, update strategy).
- Common vulnerability prevention (injection attacks, XSS, CSRF).
- File system and network access restrictions.

#### 5. \`.trae/rules/architecture.md\` (Architectural Guidelines)
Write rules governing the project's architecture:
- Separation of concerns and layer boundaries.
- Module dependency rules (what can import what).
- State management patterns and data flow.
- API design conventions (REST, GraphQL, naming, versioning).
- Database access patterns and query optimization.
- Error handling and logging standards.

#### 6. \`.trae/rules/git.md\` (Git & Version Control Rules)
Write rules governing version control practices:
- Branch naming conventions (e.g., \`feature/\`, \`fix/\`, \`chore/\`).
- Commit message format (e.g., Conventional Commits).
- PR/MR guidelines and review checklist.
- What should and should not be committed (update \`.gitignore\` guidance).
- Merge strategy preferences (rebase, squash, merge).

#### 7. \`.trae/prompts/review.md\` (Code Review Command Prompt)
Create a reusable command prompt that instructs the agent to:
- Analyze the current changeset or staged files for bugs, security issues, and style violations.
- Check for proper error handling and edge cases.
- Verify test coverage for new or modified code.
- Output a structured review summary with severity levels (critical, warning, info).

#### 8. \`.trae/prompts/refactor.md\` (Refactoring Command Prompt)
Create a reusable command prompt that instructs the agent to:
- Identify code smells, duplicated logic, and overly complex functions.
- Propose specific refactoring steps with before/after examples.
- Ensure all refactors maintain backward compatibility unless explicitly stated otherwise.
- Verify existing tests still pass after refactoring.

#### 9. \`.trae/prompts/onboard.md\` (Onboarding Command Prompt)
Create a reusable command prompt that provides:
- A high-level walkthrough of the codebase architecture.
- Key files and entry points to understand first.
- How to set up the local development environment step by step.
- Common pitfalls and gotchas specific to this project.
`;
}
