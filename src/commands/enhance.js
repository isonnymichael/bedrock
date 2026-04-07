import kleur from 'kleur';
import path from 'path';
import { getProjectStructure, createFile } from '../utils/fs-helpers.js';
import { hasExistingConfigs, readExistingConfigs, getConfigPath } from '../utils/config-reader.js';
import { generateEnhance } from '../generators/enhance.js';

const VALID_TOOLS = ['claude', 'antigravity', 'trae', 'cursor'];

function showUsageError(message) {
  console.log(kleur.red(`\n✖ Error: ${message}\n`));
  console.log(kleur.white('Usage:'));
  console.log(kleur.cyan('  npx @isonnymichael/bedrock enhance --tool <tool> [--about <what-changed>]\n'));
  console.log(kleur.white('Options:'));
  console.log(kleur.cyan('  -t, --tool <tool>          ') + kleur.dim(`Required. AI tool to enhance. Choices: ${VALID_TOOLS.join(', ')}`));
  console.log(kleur.cyan('  -a, --about <description>  ') + kleur.dim('Optional. Describe what changed in your project (new features, libraries, services, etc.)\n'));
  console.log(kleur.white('Examples:'));
  console.log(kleur.cyan('  npx @isonnymichael/bedrock enhance --tool trae'));
  console.log(kleur.cyan('  npx @isonnymichael/bedrock enhance --tool claude --about "Added Redis caching and switched from REST to GraphQL"\n'));
  process.exit(1);
}

export async function enhanceCommand(options) {
  console.log(kleur.bgBlue().white(' 🔧 Bedrock Enhance \n'));
  console.log(kleur.dim('This tool updates your existing AI configurations to reflect the current state of your project.\n'));

  const tool = options.tool;

  if (!tool) {
    showUsageError('--tool <tool> is required.');
  }

  if (!VALID_TOOLS.includes(tool)) {
    showUsageError(`"${tool}" is not a valid tool. Choose from: ${VALID_TOOLS.join(', ')}`);
  }

  const configPath = getConfigPath(tool);
  const exists = await hasExistingConfigs(tool);

  if (!exists) {
    console.log(kleur.red(`\n✖ No existing configuration found at \`${configPath}/\`.\n`));
    console.log(kleur.dim('Run the following command to create the initial configuration first:\n'));
    console.log(kleur.cyan(`  npx @isonnymichael/bedrock init --tool ${tool}\n`));
    process.exit(1);
  }

  console.log(kleur.green(`Detected existing configuration at \`${configPath}/\`. Reading files...`));
  const existingConfigs = await readExistingConfigs(tool);
  console.log(kleur.dim(`  Found ${existingConfigs.length} config file(s).\n`));

  console.log(kleur.green('Analyzing current project structure...'));
  const projectStructure = await getProjectStructure();

  const context = {
    projectStructure,
    projectAbout: options.about || '',
    existingConfigs,
  };

  let finalPrompt = `\n======================================================\n`;
  finalPrompt += `INSTRUCTIONS:\n`;
  finalPrompt += `The user has requested to enhance their existing AI configurations for ${tool}.\n`;
  finalPrompt += await generateEnhance(tool, context);
  finalPrompt += `\nDelete BEDROCK.md file after you are done.`;
  finalPrompt += `\n======================================================\n`;

  const bedrockMdPath = path.join(process.cwd(), 'BEDROCK.md');
  await createFile(bedrockMdPath, finalPrompt);
  console.log(kleur.green(`✔ Prompt written to BEDROCK.md\n`));
  console.log(kleur.bgGreen().black(` ✨ Enhancement prompt generated for ${tool}. Open BEDROCK.md and pass it to your AI agent. \n`));
}
