import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { initCommand } from './commands/init.js';
import { enhanceCommand } from './commands/enhance.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {};
  let command = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--version' || arg === '-V') {
      console.log(version);
      process.exit(0);
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-') && !command) {
      command = arg;
    } else if ((arg === '--tool' || arg === '-t') && args[i + 1]) {
      options.tool = args[++i];
    } else if ((arg === '--about' || arg === '-a') && args[i + 1]) {
      options.about = args[++i];
    }
  }

  return { command, options };
}

function printHelp() {
  console.log(`Usage: bedrock <command> [options]

Instruction-driven system initialization for AI Coding Assistants

Commands:
  init     Initialize AI assistant configuration rules
  enhance  Update existing AI configurations to reflect project changes

Options:
  -V, --version  output the version number
  -h, --help     display help for command

Run \`bedrock <command> --help\` for command-specific help.
`);
}

export async function main() {
  const { command, options } = parseArgs(process.argv);

  if (!command) {
    printHelp();
    process.exit(0);
  }

  if (command === 'init') {
    await initCommand(options);
  } else if (command === 'enhance') {
    await enhanceCommand(options);
  } else {
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }
}
