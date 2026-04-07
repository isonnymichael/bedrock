export async function generateCursor(context) {
  const intro = context.isFresh 
    ? `The project is about:\n${context.projectAbout}` 
    : `The existing project structure is:\n\`\`\`\n${context.projectStructure}\n\`\`\``;

  return `
### Cursor
Please generate the following configuration files for Cursor:
1. \`.cursor/rules/master.mdc\`: Document the high-level instructions, project description, and coding instructions using this context:
${intro}
2. \`.cursor/rules/style.mdc\`: Generate specific formatting rules tailored to the languages and frameworks detected in the project context.
`;
}
