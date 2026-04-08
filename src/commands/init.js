import { isProjectFresh, getProjectStructure, createFile } from '../utils/fs-helpers.js';
import path from 'path';

// Import generators
import { generateClaude, createClaudeStructure } from '../generators/claude.js';
import { generateAntigravity, createAntigravityStructure } from '../generators/antigravity.js';
import { generateTrae, createTraeStructure } from '../generators/trae.js';
import { generateCursor, createCursorStructure } from '../generators/cursor.js';

const VALID_TOOLS = ['claude', 'antigravity', 'trae', 'cursor'];

function showUsageError(message) {
  console.error(`\n✖ Error: ${message}\n`);
  console.error(`Usage:`);
  console.error(`  npx @isonnymichael/bedrock init --tool <tool> [--about <description>]\n`);
  console.error(`Options:`);
  console.error(`  -t, --tool <tool>          Required. AI tool to configure. Choices: ${VALID_TOOLS.join(', ')}`);
  console.error(`  -a, --about <description>  Optional. Project description (AI will auto-detect if omitted)\n`);
  console.error(`Examples:`);
  console.error(`  npx @isonnymichael/bedrock init --tool antigravity`);
  console.error(`  npx @isonnymichael/bedrock init --tool claude --about "A REST API built with Node.js"\n`);
  process.exit(1);
}

export async function initCommand(options) {
  console.log(' 🚀 Welcome to Bedrock AI !\n');
  console.log('This tool generates prompt instructions for your AI agent to build out your configurations.\n');

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
    console.log('\nDetected an existing project. Analyzing structure...');
    projectStructure = await getProjectStructure();
  }

  const context = {
    isFresh,
    projectAbout: options.about || '',
    projectStructure
  };

  console.log('Creating folder structure...');
  try {
    if (tool === 'claude') await createClaudeStructure();
    if (tool === 'antigravity') await createAntigravityStructure();
    if (tool === 'trae') await createTraeStructure();
    if (tool === 'cursor') await createCursorStructure();
    console.log('✔ Folders created.\n');
  } catch (err) {
    console.error(`❌ Failed creating folder structure: ${err.message}`);
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
    console.error(`❌ Failed generating for ${tool}: ${err.message}`);
  }

  finalPrompt += `\nUse your tools to write these files into the workspace now.`;
  finalPrompt += `\nDelete BEDROCK.md file after you are done.`;
  finalPrompt += `\n======================================================\n`;

  const bedrockMdPath = path.join(process.cwd(), 'BEDROCK.md');
  await createFile(bedrockMdPath, finalPrompt);
  console.log(`✔ Prompt written to BEDROCK.md\n`);
  console.log(` ✨ Prompt generated for ${tool}. Open BEDROCK.md and pass it to your AI agent. \n`);
}
