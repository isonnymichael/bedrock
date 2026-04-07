export async function generateAntigravity(context) {
  const intro = context.isFresh 
    ? `The project is about:\n${context.projectAbout}` 
    : `The existing project structure is:\n\`\`\`\n${context.projectStructure}\n\`\`\``;

  return `
### Antigravity (Gemini)
Please generate the following configuration files for Antigravity:
1. \`.agents/rules/format.md\`: Analyze the project structure and write robust code style and formatting rules tailor-made for this project.
2. \`.agents/rules/tests.md\`: Write comprehensive guidelines on how to test this specific repository, including recommended frameworks or approaches.
3. \`.agents/GEMINI.md\`: This is the Master Guide. Outline the high-level project goals, tech stack, and core architecture using this context:
${intro}
`;
}
