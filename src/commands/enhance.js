import path from 'path';
import { getProjectStructure, createFile } from '../utils/fs-helpers.js';
import { readExistingConfigs, getConfigPath, detectExistingTools } from '../utils/config-reader.js';
import { generateEnhance } from '../generators/enhance.js';

export async function enhanceCommand(options) {
  console.log(' 🔧 Bedrock Enhance \n');
  console.log('This tool updates your existing AI configurations to reflect the current state of your project.\n');

  console.log('Scanning for existing configurations...');
  const detectedTools = await detectExistingTools();

  if (detectedTools.length === 0) {
    console.error('\n✖ No existing AI configurations found.\n');
    console.error('Run the following command to create the initial configuration first:\n');
    console.error('  npx @isonnymichael/bedrock init --tool <tool>\n');
    process.exit(1);
  }

  console.log(`Found configurations for: ${detectedTools.join(', ')}\n`);

  console.log('Analyzing current project structure...');
  const projectStructure = await getProjectStructure();

  let finalPrompt = `\n======================================================\n`;
  finalPrompt += `INSTRUCTIONS:\n`;

  for (const tool of detectedTools) {
    const configPath = getConfigPath(tool);
    console.log(`Reading ${tool} configuration at \`${configPath}/\`...`);
    const existingConfigs = await readExistingConfigs(tool);
    console.log(`  Found ${existingConfigs.length} config file(s).`);

    const context = {
      projectStructure,
      projectAbout: options.about || '',
      existingConfigs,
    };

    finalPrompt += `The user has requested to enhance their existing AI configurations for ${tool}.\n`;
    finalPrompt += await generateEnhance(tool, context);
    finalPrompt += `\n`;
  }

  finalPrompt += `\nDelete BEDROCK.md file after you are done.`;
  finalPrompt += `\n======================================================\n`;

  const bedrockMdPath = path.join(process.cwd(), 'BEDROCK.md');
  await createFile(bedrockMdPath, finalPrompt);
  console.log(`\n✔ Prompt written to BEDROCK.md\n`);
  console.log(` ✨ Enhancement prompt generated for ${detectedTools.join(', ')}. Open BEDROCK.md and pass it to your AI agent. \n`);
}
