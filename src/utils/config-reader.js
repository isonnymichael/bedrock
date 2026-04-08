import fs from 'fs/promises';
import path from 'path';

const CONFIG_PATHS = {
  claude: '.claude',
  antigravity: '.agents',
  trae: '.trae',
  cursor: '.cursor',
};

const READABLE_EXTENSIONS = ['.md', '.mdc', '.json'];

export function getConfigPath(tool) {
  return CONFIG_PATHS[tool];
}

export function getAllTools() {
  return Object.keys(CONFIG_PATHS);
}

export async function detectExistingTools() {
  const detected = [];
  for (const tool of Object.keys(CONFIG_PATHS)) {
    if (await hasExistingConfigs(tool)) {
      detected.push(tool);
    }
  }
  return detected;
}

export async function hasExistingConfigs(tool) {
  const configPath = path.join(process.cwd(), CONFIG_PATHS[tool]);
  try {
    const stat = await fs.stat(configPath);
    if (!stat.isDirectory()) return false;
    const files = await fs.readdir(configPath);
    return files.length > 0;
  } catch {
    return false;
  }
}

export async function readExistingConfigs(tool) {
  const configDir = path.join(process.cwd(), CONFIG_PATHS[tool]);
  const results = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (READABLE_EXTENSIONS.includes(path.extname(entry.name))) {
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
          results.push({ path: relativePath, content });
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  await walk(configDir);
  return results;
}
