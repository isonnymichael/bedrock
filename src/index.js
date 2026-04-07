import { Command } from 'commander';
import { createRequire } from 'module';
import { initCommand } from './commands/init.js';

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
    .option('-a, --about <description>', 'Project description (skips interactive prompt)')
    .action(initCommand);

  await program.parseAsync(process.argv);
}
