import prompts from 'prompts';
import kleur from 'kleur';
import { isProjectFresh, getProjectStructure } from '../utils/fs-helpers.js';

// Import generators
import { generateClaude } from '../generators/claude.js';
import { generateAntigravity } from '../generators/antigravity.js';
import { generateTrae } from '../generators/trae.js';
import { generateCursor } from '../generators/cursor.js';

export async function initCommand() {
  console.log(kleur.bgBlue().white(' 🚀 Welcome to Bedrock AI ! \n'));
  console.log(kleur.dim('This tool generates prompt instructions for your AI agent to build out your configurations.\n'));

  const aiSelection = await prompts({
    type: 'multiselect',
    name: 'tools',
    message: 'What AI Tools do you use? (Space to select, Enter to confirm)',
    choices: [
      { title: 'Claude Code', value: 'claude' },
      { title: 'Antigravity (Gemini)', value: 'antigravity' },
      { title: 'Trae', value: 'trae' },
      { title: 'Cursor', value: 'cursor' }
    ],
    min: 1
  });

  if (!aiSelection.tools || aiSelection.tools.length === 0) {
    console.log(kleur.red('No tools selected. Exiting...'));
    process.exit(0);
  }

  const isFresh = await isProjectFresh();
  let projectAbout = '';
  let projectStructure = '';

  if (isFresh) {
    console.log(kleur.yellow('\nDetected a fresh project.'));
    const response = await prompts({
      type: 'text',
      name: 'about',
      message: 'What is this project about? (This context will be given to the AI)'
    });
    projectAbout = response.about || 'A new project.';
  } else {
    console.log(kleur.green('\nDetected an existing project. Analyzing structure...'));
    projectStructure = await getProjectStructure();
  }

  const context = {
    isFresh,
    projectAbout,
    projectStructure
  };

  let finalPrompt = `\n======================================================\n`;
  finalPrompt += `AI AGENT INSTRUCTIONS:\n`;
  finalPrompt += `The user has requested to initialize Bedrock configurations for their project.\n`;
  finalPrompt += `Please autonomously create the following folders and files with intelligently generated boilerplate rules according to the context provided:\n`;

  for (const tool of aiSelection.tools) {
    try {
      if (tool === 'claude') finalPrompt += await generateClaude(context);
      if (tool === 'antigravity') finalPrompt += await generateAntigravity(context);
      if (tool === 'trae') finalPrompt += await generateTrae(context);
      if (tool === 'cursor') finalPrompt += await generateCursor(context);
    } catch (err) {
      console.log(kleur.red(`❌ Failed generating for ${tool}: ${err.message}`));
    }
  }

  finalPrompt += `\nUse your tools to write these files into the workspace now.`;
  finalPrompt += `\n======================================================\n`;

  // Output the final prompt to the terminal so the reading AI executes it
  console.log(kleur.cyan(finalPrompt));
  console.log(kleur.bgGreen().black(' ✨ Prompt generated. The AI should now take over. \n'));
}
