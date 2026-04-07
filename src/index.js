import { Command } from 'commander';
import { createRequire } from 'module';
import { initCommand } from './commands/init.js';
import { enhanceCommand } from './commands/enhance.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

export async function main() {
  const program = new Command();

  program
    .name('bedrock')
    .description('Instruction-driven system initialization for AI Coding Assistants')
    .version(version);

  program
    .command('init')
    .description('Initialize AI assistant configuration rules')
    .option('-t, --tool <tool>', 'AI tool to configure (claude, antigravity, trae, cursor)')
    .option('-a, --about <description>', 'Project description')
    .action(initCommand);

  program
    .command('enhance')
    .description('Update existing AI configurations to reflect project changes')
    .option('-t, --tool <tool>', 'AI tool to enhance (claude, antigravity, trae, cursor)')
    .option('-a, --about <description>', 'Describe what changed in your project')
    .action(enhanceCommand);

  await program.parseAsync(process.argv);
}
