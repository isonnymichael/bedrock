import kleur from 'kleur';
import path from 'path';
import { getProjectStructure, createFile } from '../utils/fs-helpers.js';
import { readExistingConfigs, getConfigPath, detectExistingTools } from '../utils/config-reader.js';
import { generateEnhance } from '../generators/enhance.js';

export async function enhanceCommand(options) {
  console.log(kleur.bgBlue().white(' 🔧 Bedrock Enhance \n'));
  console.log(kleur.dim('This tool updates your existing AI configurations to reflect the current state of your project.\n'));

  console.log(kleur.green('Scanning for existing configurations...'));
  const detectedTools = await detectExistingTools();

  if (detectedTools.length === 0) {
    console.log(kleur.red('\n✖ No existing AI configurations found.\n'));
    console.log(kleur.dim('Run the following command to create the initial configuration first:\n'));
    console.log(kleur.cyan('  npx @isonnymichael/bedrock init --tool <tool>\n'));
    process.exit(1);
  }

  console.log(kleur.green(`Found configurations for: ${detectedTools.join(', ')}\n`));

  console.log(kleur.green('Analyzing current project structure...'));
  const projectStructure = await getProjectStructure();

  let finalPrompt = `\n======================================================\n`;
  finalPrompt += `INSTRUCTIONS:\n`;

  for (const tool of detectedTools) {
    const configPath = getConfigPath(tool);
    console.log(kleur.green(`Reading ${tool} configuration at \`${configPath}/\`...`));
    const existingConfigs = await readExistingConfigs(tool);
    console.log(kleur.dim(`  Found ${existingConfigs.length} config file(s).`));

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
  console.log(kleur.green(`\n✔ Prompt written to BEDROCK.md\n`));
  console.log(kleur.bgGreen().black(` ✨ Enhancement prompt generated for ${detectedTools.join(', ')}. Open BEDROCK.md and pass it to your AI agent. \n`));
}
