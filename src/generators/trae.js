export async function generateTrae(context) {
  const intro = context.isFresh 
    ? `The project is about:\n${context.projectAbout}` 
    : `The existing project structure is:\n\`\`\`\n${context.projectStructure}\n\`\`\``;

  return `
### Trae
Please generate the following configuration files for Trae:
1. \`.trae/rules/general.md\`: Write deep architectural and general coding rules specifically based on the context of this project.
2. \`.trae/prompts/command.md\`: Create a boilerplate custom command prompt context useful for this codebase.
3. \`.trae/AGENTS.md\`: This is the master config. Detail the overarching project goals and technical constraints based on the context:
${intro}
`;
}
