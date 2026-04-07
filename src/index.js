import { Command } from 'commander';
import { initCommand } from './commands/init.js';

export async function main() {
  const program = new Command();

  program
    .name('bedrock')
    .description('Instruction-driven system initialization for AI Coding Assistants')
    .version('1.0.0');

  program
    .command('init')
    .description('Initialize AI assistant configuration rules')
    .action(initCommand);

  await program.parseAsync(process.argv);
}
