export async function generateEnhance(tool, context) {
  const { projectStructure, projectAbout, existingConfigs } = context;

  const configDump = existingConfigs
    .map(f => `#### \`${f.path}\`\n\`\`\`\n${f.content.trim()}\n\`\`\``)
    .join('\n\n');

  const changeContext = projectAbout
    ? `The user has described the following updates to the project:\n${projectAbout}`
    : `No explicit change description was provided. Infer what has changed by comparing the existing configs against the current project structure.`;

  return `
### Enhance: ${tool}

**Current Project Structure:**
\`\`\`
${projectStructure}
\`\`\`

**Change Description:**
${changeContext}

---

**Existing Configuration Files:**

${configDump}

---

**Instructions:**
Review all existing configuration files above against the current project structure and change description. Your goal is to bring them up to date without losing any existing customizations.

Specifically:
1. **Update the master guide** — Reflect any new frameworks, libraries, services, or architectural layers visible in the project structure or described by the user.
2. **Update tech stack references** — Correct any outdated versions, tools, or package names found in the configs.
3. **Add missing rules** — If new technologies were introduced (e.g., a new ORM, testing tool, or deployment target), generate the corresponding rules and guidelines that are absent from the current configs.
4. **Remove stale rules** — Delete or rewrite any rules that no longer apply to the current project (e.g., references to removed dependencies or old patterns).
5. **Preserve intent** — Keep all existing custom rules, constraints, and team-specific decisions that are still valid. Do not reset files to generic boilerplate.
6. **Fill gaps** — If any expected config files (rules, workflows, skills) are missing entirely, generate them now based on the current project context.

Rewrite only what needs to change. Return the full updated content for every file that requires modification.
Use your tools to write the updated files into the workspace now.
`;
}
