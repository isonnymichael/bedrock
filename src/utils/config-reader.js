import fs from 'fs/promises';
import path from 'path';

const CONFIG_PATHS = {
  claude: '.claude',
  antigravity: '.agents',
  trae: '.trae',
  cursor: '.cursor/rules',
};

const READABLE_EXTENSIONS = ['.md', '.mdc', '.json'];

export function getConfigPath(tool) {
  return CONFIG_PATHS[tool];
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
