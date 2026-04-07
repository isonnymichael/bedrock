export async function generateClaude(context) {
  const intro = context.isFresh 
    ? `The project is about:\n${context.projectAbout}` 
    : `The existing project structure is:\n\`\`\`\n${context.projectStructure}\n\`\`\``;

  return `
### Claude Code
Please generate the following configuration files for Claude Code:
1. \`.claude/rules/format.md\`: Based on the project tech stack, write highly detailed code formatting rules and conventions.
2. \`.claude/skills/custom.md\`: Provide a template for defining custom skills, populated with any relevant examples based on the project context.
3. \`.claude/CLAUDE.md\`: This is the master guide. Use the following project context to populate the high-level goals and tech stack:
${intro}
4. \`settings.local.json\`: Create a standard permissions object with "allow" and "deny" arrays.
`;
}
