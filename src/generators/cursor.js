export async function generateCursor(context) {
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
### Cursor
📚 **Official Documentation:**
- Rules for AI: https://docs.cursor.com/context/rules
- .cursorrules Reference: https://docs.cursor.com/context/rules#project-rules
- Context & Settings: https://docs.cursor.com/context

Refer to the documentation above for the correct .mdc file format, YAML frontmatter structure, and best practices. Generate the following configuration files for Cursor IDE. Each \`.mdc\` file must include proper YAML frontmatter with \`description\`, \`globs\`, and \`alwaysApply\` fields. Each file must be comprehensive, production-grade, and tailored to the project context below.

**Project Context:**
${intro}

---

#### 1. \`.cursor/rules/project.mdc\` (Master Project Guide)
This is the primary project configuration file. Set \`alwaysApply: true\`.
Generate it with the following sections:
- **Project Overview**: A concise 2-3 line summary of the project's purpose, goals, and target audience.
- **Tech Stack**: Explicitly list all languages, frameworks, runtimes, package managers, and key libraries with version constraints (e.g., "Node.js 20+", "React 18 with TypeScript 5.x").
- **Architecture & Directory Map**: Describe the project structure with clear responsibilities for each key directory.
- **Development Commands**: List essential commands (build, dev, test, lint, deploy) with exact syntax.
- **Coding Conventions**: Define naming conventions, file organization, import ordering, and error handling strategies.
- **Critical Rules**: Mark non-negotiable rules clearly (e.g., "Never commit secrets", "Always validate user input").

#### 2. \`.cursor/rules/style.mdc\` (Code Formatting & Style Rules)
Set \`alwaysApply: true\`. Write highly detailed, enforceable formatting rules:
- Indentation style and size (tabs vs spaces, width).
- Naming conventions for variables, functions, classes, constants, files, and directories.
- Import/export ordering and grouping rules.
- Maximum line length and line-wrapping preferences.
- Comment style requirements (JSDoc, inline, block, docstrings).
- Language-specific conventions (e.g., TypeScript strict mode, Python PEP8).
- Framework-specific patterns (e.g., React component structure, Vue composition API).
- Example "gold standard" code snippets demonstrating the expected format.

#### 3. \`.cursor/rules/testing.mdc\` (Testing Guidelines)
Set \`alwaysApply: false\` with \`description: "Testing conventions and standards"\` and appropriate \`globs\` for test files (e.g., \`["**/*.test.*", "**/*.spec.*", "**/__tests__/**"]\`).
Include:
- Recommended test framework and assertion library (e.g., Vitest, Jest, pytest).
- Test file naming conventions and directory structure.
- Required test coverage thresholds and what areas must be tested.
- Unit test patterns: setup/teardown, mocking strategies, fixture usage.
- Integration and E2E test guidelines if applicable.
- Example test structure showing a well-written, idiomatic test case.

#### 4. \`.cursor/rules/security.mdc\` (Security Guardrails)
Set \`alwaysApply: true\`. Write security-focused rules:
- Input validation and sanitization requirements.
- Authentication and authorization patterns.
- Secrets management (never hardcode, use environment variables).
- Dependency security (audit schedule, version pinning, update strategy).
- Common vulnerability prevention (injection attacks, XSS, CSRF).
- File system and network access restrictions.

#### 5. \`.cursor/rules/architecture.mdc\` (Architectural Guidelines)
Set \`alwaysApply: false\` with \`description: "Architecture patterns and module boundaries"\`.
Write rules governing the project's architecture:
- Separation of concerns and layer boundaries.
- Module dependency rules (what can import what).
- State management patterns and data flow.
- API design conventions (REST, GraphQL, naming, versioning).
- Database access patterns and query optimization.
- Error handling and logging standards.

#### 6. \`.cursor/rules/git.mdc\` (Git & Version Control Rules)
Set \`alwaysApply: false\` with \`description: "Git workflow, commit messages, and branching rules"\`.
Write rules governing version control practices:
- Branch naming conventions (e.g., \`feature/\`, \`fix/\`, \`chore/\`).
- Commit message format (e.g., Conventional Commits: \`type(scope): description\`).
- PR/MR guidelines and review checklist.
- What should and should not be committed (update \`.gitignore\` guidance).
- Merge strategy preferences (rebase, squash, merge).

#### 7. \`.cursor/rules/documentation.mdc\` (Documentation Rules)
Set \`alwaysApply: false\` with \`description: "Documentation standards for code and APIs"\`.
Write documentation standards:
- Required documentation for public functions, classes, and modules.
- JSDoc / docstring format and required tags (e.g., \`@param\`, \`@returns\`, \`@throws\`).
- README structure and what sections it must include.
- Changelog and migration guide requirements.
- Inline comment guidelines (when to comment, when not to).

#### 8. \`.cursor/rules/frontend.mdc\` (Frontend-Specific Rules — if applicable)
Set \`alwaysApply: false\` with appropriate \`globs\` (e.g., \`["src/components/**", "src/pages/**", "src/views/**"]\`).
Only generate this file if the project has a frontend. Include:
- Component structure and naming conventions.
- State management patterns (local state, global store).
- Styling approach (CSS modules, styled-components, Tailwind, etc.).
- Accessibility requirements (ARIA attributes, keyboard navigation, semantic HTML).
- Performance best practices (lazy loading, code splitting, memoization).

#### 9. \`.cursor/rules/backend.mdc\` (Backend-Specific Rules — if applicable)
Set \`alwaysApply: false\` with appropriate \`globs\` (e.g., \`["src/api/**", "src/server/**", "src/routes/**"]\`).
Only generate this file if the project has a backend. Include:
- Route/controller structure and naming conventions.
- Middleware ordering and error handling.
- Database query patterns and ORM usage.
- API response format standards (status codes, error shapes, pagination).
- Rate limiting, caching, and performance guidelines.
`;
}
