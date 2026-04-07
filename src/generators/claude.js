export async function generateClaude(context) {
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
### Claude Code
📚 **Official Documentation:**
- Memory & CLAUDE.md: https://docs.anthropic.com/en/docs/claude-code/memory
- Settings & Permissions: https://docs.anthropic.com/en/docs/claude-code/settings
- Custom Slash Commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands

Refer to the documentation above for the correct file format, structure, and best practices. Generate the following configuration files for Claude Code. Each file must be comprehensive, production-grade, and tailored to the project context below.

**Project Context:**
${intro}

---

#### 1. \`CLAUDE.md\` (Root — Master Guide)
This is the most critical file. It is loaded at the start of every Claude Code session. Generate it with the following sections:
- **Project Overview**: A concise 2-3 line summary of what the project does, its purpose, and target audience.
- **Tech Stack**: Explicitly list all languages, frameworks, runtimes, package managers, and key libraries. Be specific (e.g., "Node.js 20+", "React 18 with TypeScript 5.x").
- **Architecture & Directory Structure**: Map out key directories and their responsibilities. Explain the separation of concerns (e.g., \`src/api/\` handles REST endpoints, \`src/models/\` defines database schemas).
- **Development Commands**: List all essential commands for building, running, testing, linting, and deploying the project.
- **Coding Conventions & Constraints**: Define naming conventions, file organization patterns, import ordering, error handling strategies, and any "never do this" rules.
- **Critical Rules**: Use \`**IMPORTANT**\` markers for rules that must never be violated (e.g., "Never commit secrets", "Always use parameterized queries").
- Keep it under 200 lines. Use \`@\` imports to reference detailed docs if needed.

#### 2. \`.claude/rules/format.md\` (Code Formatting Rules)
Write highly detailed, enforceable formatting rules. Include:
- Indentation style and size (tabs vs spaces, width).
- Naming conventions for variables, functions, classes, constants, files, and directories.
- Import/export ordering and grouping rules.
- Maximum line length and wrapping preferences.
- Comment style requirements (JSDoc, inline, block).
- Language-specific conventions (e.g., TypeScript strict mode, Python PEP8).
- Framework-specific patterns (e.g., React component structure, Express middleware ordering).
- Example code snippets showing the "gold standard" format.

#### 3. \`.claude/rules/testing.md\` (Testing Guidelines)
Write comprehensive testing rules and standards:
- Recommended test framework and assertion library (e.g., Vitest, Jest, pytest).
- Test file naming conventions and directory structure (e.g., \`__tests__/\`, \`*.test.ts\`).
- Required test coverage thresholds and what must be tested.
- Unit test patterns: setup/teardown, mocking strategies, fixture usage.
- Integration and E2E test guidelines if applicable.
- Example test structure showing a well-written test case.

#### 4. \`.claude/rules/security.md\` (Security Guardrails)
Write security-focused rules the agent must always follow:
- Input validation and sanitization requirements.
- Authentication and authorization patterns.
- Secrets management (never hardcode, use environment variables).
- Dependency security (audit, pinning, update strategy).
- Common vulnerability prevention (SQL injection, XSS, CSRF).
- File system and network access restrictions.

#### 5. \`.claude/commands/review.md\` (Slash Command)
Create a reusable \`/review\` slash command that instructs the agent to:
- Analyze the current changeset or staged files for bugs, security issues, and style violations.
- Check for proper error handling and edge cases.
- Verify test coverage for new or modified code.
- Output a structured review summary with severity levels.

#### 6. \`.claude/commands/docs.md\` (Slash Command)
Create a reusable \`/docs\` slash command that instructs the agent to:
- Scan the project for undocumented or poorly documented public APIs.
- Generate or update inline documentation (JSDoc, docstrings, etc.).
- Update the README.md if structural changes are detected.

#### 7. \`.claude/skills/debug.md\` (Skill Definition)
Create a debugging skill template with:
- A YAML frontmatter containing \`name\` and \`description\`.
- Step-by-step instructions for systematic debugging: reproduce → isolate → diagnose → fix → verify.
- Guidelines on reading stack traces, using logging, and writing regression tests.

#### 8. \`settings.local.json\` (Permissions)
Create a standard permissions configuration with:
- An \`"allow"\` array listing safe operations (e.g., read files, run tests, lint).
- A \`"deny"\` array listing dangerous operations (e.g., delete files outside project, install global packages, access network without approval).
`;
}
