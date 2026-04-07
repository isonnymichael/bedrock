import kleur from 'kleur';
import { isProjectFresh, getProjectStructure } from '../utils/fs-helpers.js';

// Import generators
import { generateClaude, createClaudeStructure } from '../generators/claude.js';
import { generateAntigravity, createAntigravityStructure } from '../generators/antigravity.js';
import { generateTrae, createTraeStructure } from '../generators/trae.js';
import { generateCursor, createCursorStructure } from '../generators/cursor.js';

const VALID_TOOLS = ['claude', 'antigravity', 'trae', 'cursor'];

function showUsageError(message) {
  console.log(kleur.red(`\n✖ Error: ${message}\n`));
  console.log(kleur.white('Usage:'));
  console.log(kleur.cyan('  npx @isonnymichael/bedrock init --tool <tool> [--about <description>]\n'));
  console.log(kleur.white('Options:'));
  console.log(kleur.cyan('  -t, --tool <tool>          ') + kleur.dim(`Required. AI tool to configure. Choices: ${VALID_TOOLS.join(', ')}`));
  console.log(kleur.cyan('  -a, --about <description>  ') + kleur.dim('Optional. Project description (AI will auto-detect if omitted)\n'));
  console.log(kleur.white('Examples:'));
  console.log(kleur.cyan('  npx @isonnymichael/bedrock init --tool antigravity'));
  console.log(kleur.cyan('  npx @isonnymichael/bedrock init --tool claude --about "A REST API built with Node.js"\n'));
  process.exit(1);
}

export async function initCommand(options) {
  console.log(kleur.bgBlue().white(' 🚀 Welcome to Bedrock AI ! \n'));
  console.log(kleur.dim('This tool generates prompt instructions for your AI agent to build out your configurations.\n'));

  const tool = options.tool;

  if (!tool) {
    showUsageError('--tool <tool> is required.');
  }

  if (!VALID_TOOLS.includes(tool)) {
    showUsageError(`"${tool}" is not a valid tool. Choose from: ${VALID_TOOLS.join(', ')}`);
  }

  const isFresh = await isProjectFresh();
  let projectStructure = '';

  if (!isFresh) {
    console.log(kleur.green('\nDetected an existing project. Analyzing structure...'));
    projectStructure = await getProjectStructure();
  }

  const context = {
    isFresh,
    projectAbout: options.about || '',
    projectStructure
  };

  console.log(kleur.dim('Creating folder structure...'));
  try {
    if (tool === 'claude') await createClaudeStructure();
    if (tool === 'antigravity') await createAntigravityStructure();
    if (tool === 'trae') await createTraeStructure();
    if (tool === 'cursor') await createCursorStructure();
    console.log(kleur.green('✔ Folders created.\n'));
  } catch (err) {
    console.log(kleur.red(`❌ Failed creating folder structure: ${err.message}`));
  }

  let finalPrompt = `\n======================================================\n`;
  finalPrompt += `INSTRUCTIONS:\n`;
  finalPrompt += `The user has requested to initialize AI Configurations, Project Specifications, Workflows, Guardrails, and Rules for their project.\n`;
  finalPrompt += `Please autonomously create the following folders and files with intelligently generated boilerplate rules according to the context provided:\n`;

  try {
    if (tool === 'claude') finalPrompt += await generateClaude(context);
    if (tool === 'antigravity') finalPrompt += await generateAntigravity(context);
    if (tool === 'trae') finalPrompt += await generateTrae(context);
    if (tool === 'cursor') finalPrompt += await generateCursor(context);
  } catch (err) {
    console.log(kleur.red(`❌ Failed generating for ${tool}: ${err.message}`));
  }

  finalPrompt += `\nUse your tools to write these files into the workspace now.`;
  finalPrompt += `\n======================================================\n`;

  console.log(kleur.cyan(finalPrompt));
  console.log(kleur.bgGreen().black(` ✨ Prompt generated for ${tool}. The AI should now take over. \n`));
}
