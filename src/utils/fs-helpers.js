import fs from 'fs/promises';
import path from 'path';

export async function isProjectFresh() {
  const cwd = process.cwd();
  try {
    const files = await fs.readdir(cwd);
    // Ignore common hidden folders like .git, .vscode, etc.
    const relevantFiles = files.filter(f => !f.startsWith('.') && f !== 'node_modules');
    // If there are less than 2 relevant files/folders, we consider it fresh
    return relevantFiles.length === 0;
  } catch (err) {
    return true; // if we can't read, assume fresh
  }
}

export async function getProjectStructure(depth = 2) {
  const cwd = process.cwd();
  
  async function readDirRecursive(dir, currentDepth) {
    if (currentDepth > depth) return [];
    
    let results = [];
    try {
      const items = await fs.readdir(dir, { withFileTypes: true });
      for (const item of items) {
        if (item.name.startsWith('.') || item.name === 'node_modules') continue;
        
        if (item.isDirectory()) {
          results.push(`${item.name}/`);
          const subItems = await readDirRecursive(path.join(dir, item.name), currentDepth + 1);
          results.push(...subItems.map(si => `  ${item.name}/${si}`));
        } else {
          results.push(item.name);
        }
      }
    } catch (e) {
      // ignore errors for specific dirs
    }
    return results;
  }

  const structure = await readDirRecursive(cwd, 1);
  return structure.join('\n');
}

export async function createDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (e) {
    // Ignore if already exists
  }
}

export async function createFile(filePath, content) {
  await createDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf-8');
}
