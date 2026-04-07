<h1 align="center">🪨 Bedrock | AI-Ready Project Configurator 🚀</h1>

<p align="center">
  <img src="https://img.shields.io/github/license/isonnymichael/bedrock?style=flat-square&color=3b82f6" alt="License">
  <img src="https://img.shields.io/github/stars/isonnymichael/bedrock?style=flat-square&color=3b82f6" alt="Stars">
  <img src="https://img.shields.io/github/forks/isonnymichael/bedrock?style=flat-square&color=3b82f6" alt="Forks">
  <img src="https://img.shields.io/github/issues/isonnymichael/bedrock?style=flat-square&color=ef4444" alt="Issues">
</p>

<p align="center">
  <strong>Bootstrap AI-ready project configurations with a single command.</strong>
</p>

<p align="center">
  Bedrock generates standardized rules, skills, and project context tailored to tools like Claude Code, Antigravity, and Trae—so you can get consistent, instruction-driven AI behavior instantly.
</p>

<p align="center">
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-supported-ai-tools">Supported Tools</a> •
  <a href="#-development">Development</a>
</p>

---

## ✨ Features

- 🤖 **Multi-assistant support** — Generate configs for Claude Code, Antigravity (Gemini), Trae, and Cursor
- 🧠 **Context-aware** — Auto-detects existing projects and reads their structure, or accepts a description for new ones
- 📋 **Production-grade output** — Generates master guides, formatting rules, testing standards, security guardrails, workflows, and more
- ⚡ **Zero setup** — One command, instant output — the generated prompt is handed off directly to your AI agent to execute
- 🔧 **Extensible** — Clean generator architecture makes it easy to add support for new AI tools

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+

---

## 📖 Usage

Open your AI Coding Assistant and give it the following prompt:

```bash
run npx @isonnymichael/bedrock init
```

### Interactive Flow

1. **Select your AI tool** — Choose from Claude Code, Antigravity (Gemini), Trae, or Cursor
2. **Project detection** — Bedrock auto-detects whether your project is new or existing
   - **New project**: You'll be prompted to describe your project
   - **Existing project**: Bedrock scans your directory structure automatically
3. **Prompt generation** — A detailed, structured prompt is printed to your terminal
4. **AI takeover** — Paste the prompt into your AI assistant and let it create all the config files

---

## 🤖 Supported AI Tools

| Tool | Config Location | Files Generated |
|------|----------------|-----------------|
| **Claude Code** | `.claude/` | `CLAUDE.md`, rules, slash commands, skills |
| **Antigravity (Gemini)** | `.agents/` | `GEMINI.md`, rules, workflows, skills |
| **Trae** | `.trae/` | `AGENTS.md`, rules, prompts |
| **Cursor** | `.cursor/rules/` | `.mdc` rule files for all categories |

### What Gets Generated

Each assistant config includes:

- **Master Guide** — Primary instruction file loaded at the start of every session
- **Code Formatting Rules** — Indentation, naming conventions, import ordering, gold-standard snippets
- **Testing Standards** — Framework recommendations, coverage thresholds, test structure examples
- **Security Guardrails** — Input validation, secrets management, vulnerability prevention
- **Architecture Guidelines** — Layer boundaries, module dependencies, API design conventions
- **Workflows / Commands** — Reusable code review, documentation, onboarding, and refactoring workflows
- **Skills** — Debugging skill templates with systematic step-by-step instructions

---

## 📁 Project Structure

```
bedrock/
├── bin/
│   └── bedrock.js          # CLI entrypoint
├── src/
│   ├── index.js             # Commander.js program setup
│   ├── commands/
│   │   └── init.js          # `bedrock init` command logic
│   ├── generators/
│   │   ├── antigravity.js   # Prompt generator for Antigravity (Gemini)
│   │   ├── claude.js        # Prompt generator for Claude Code
│   │   ├── cursor.js        # Prompt generator for Cursor
│   │   └── trae.js          # Prompt generator for Trae
│   └── utils/
│       └── fs-helpers.js    # File system utilities
└── package.json
```

---

## 🛠️ Development

```bash
# Clone the repo
git clone https://github.com/isonnymichael/bedrock.git
cd bedrock

# Install dependencies
npm install

# Run the init command locally
npm run init
```

### Adding a New Generator

1. Create a new file in `src/generators/<tool-name>.js`
2. Export a `generate<ToolName>(context)` async function that returns a prompt string
3. Import and wire it up in `src/commands/init.js`

The `context` object passed to every generator contains:

```js
{
  isFresh: Boolean,        // true if project has no existing files
  projectAbout: String,    // user-provided project description
  projectStructure: String // scanned directory tree (existing projects only)
}
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| [`commander`](https://github.com/tj/commander.js) | CLI argument parsing |
| [`prompts`](https://github.com/terkelg/prompts) | Interactive terminal prompts |
| [`kleur`](https://github.com/lukeed/kleur) | Terminal color output |

---

## 📄 License

GPL-3.0 © Sonny Michael
