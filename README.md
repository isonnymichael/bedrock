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
  <a href="#-enhance">Enhance</a> •
  <a href="#-supported-ai-tools">Supported Tools</a> •
  <a href="#-tips">Tips</a> •
  <a href="#-development">Development</a>
</p>

---

## ✨ Features

- 🤖 **Multi-assistant support** — Generate configs for Claude Code, Antigravity (Gemini), Trae, and Cursor
- 🧠 **Context-aware** — Auto-detects existing projects and reads their structure, or accepts a description for new ones
- 📋 **Production-grade output** — Generates master guides, formatting rules, testing standards, security guardrails, workflows, and more
- ⚡ **Zero setup** — Paste one prompt into your AI agent chat, and it runs the command, reads the output, and writes every config file automatically
- 🔄 **Enhance existing configs** — Keep your AI configurations in sync as your project evolves with the `enhance` command
- 🔧 **Extensible** — Clean generator architecture makes it easy to add support for new AI tools

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+

---

## 📖 Usage

> **Bedrock is designed to be invoked through your AI Agent chat — not run directly in a terminal.**
> Open your AI agent (Claude Code, Cursor, Trae, Antigravity, etc.), then paste a prompt like the ones below. The agent will run the command, create the folder structure, and populate every config file automatically.

### How to use

**Step 1 — Open your AI Agent chat.**

**Step 2 — Paste a prompt telling the agent to run Bedrock:**

```
Run npx @isonnymichael/bedrock init --tool <tool>
```

Or with a project description:

```
Run npx @isonnymichael/bedrock init --tool <tool> --about "<description>"
```

**Step 3 — The agent runs the command, reads the generated instructions, and writes all config files into your project.**

---

**Command reference:**

| Flag | Required | Description |
|------|----------|-------------|
| `-t, --tool <tool>` | Yes | AI tool to configure. Choices: `claude`, `antigravity`, `trae`, `cursor` |
| `-a, --about <description>` | No | Project description. If omitted, Bedrock auto-detects the existing project structure |

If `--tool` is missing or invalid, Bedrock prints an error with the correct usage and exits.

---

### Examples

#### Claude Code

Open Claude Code agent chat and type:

```
Run npx @isonnymichael/bedrock init --tool claude
```

With a project description:

```
Run npx @isonnymichael/bedrock init --tool claude --about "A multi-tenant SaaS REST API built with Node.js 20, Express, PostgreSQL, and Prisma ORM. Handles billing via Stripe and auth via JWT."
```

```
Run npx @isonnymichael/bedrock init --tool claude --about "A pnpm monorepo with a Next.js 14 frontend (App Router, Tailwind CSS) and a shared TypeScript component library published to npm."
```

#### Antigravity (Gemini)

Open Antigravity agent chat and type:

```
Run npx @isonnymichael/bedrock init --tool antigravity
```

With a project description:

```
Run npx @isonnymichael/bedrock init --tool antigravity --about "A React Native 0.74 mobile app targeting iOS and Android. Uses Expo, Zustand for state management, and React Query for data fetching."
```

```
Run npx @isonnymichael/bedrock init --tool antigravity --about "A Python 3.12 data pipeline using Apache Airflow for orchestration, dbt for transformations, and BigQuery as the data warehouse."
```

#### Trae

Open Trae agent chat and type:

```
Run npx @isonnymichael/bedrock init --tool trae
```

With a project description:

```
Run npx @isonnymichael/bedrock init --tool trae --about "A fullstack web app with a Vue 3 (Composition API, TypeScript) frontend and a FastAPI Python backend. Uses PostgreSQL, SQLAlchemy, and Docker Compose for local dev."
```

```
Run npx @isonnymichael/bedrock init --tool trae --about "A React Native app with Expo Router for navigation, WatermelonDB for offline-first local storage, and a GraphQL API backend built with NestJS and Apollo Server."
```

#### Cursor

Open Cursor agent chat and type:

```
Run npx @isonnymichael/bedrock init --tool cursor
```

With a project description:

```
Run npx @isonnymichael/bedrock init --tool cursor --about "A Go microservices backend using gRPC for inter-service communication, deployed on Kubernetes. Includes services for auth, payments, and notifications."
```

---

### Writing a Good `--about` Description

The more specific your description, the more tailored the generated config will be. Include:

- **Language and runtime** with version (e.g., `Node.js 20`, `Python 3.12`, `Go 1.22`)
- **Frameworks and libraries** (e.g., `Next.js 14 App Router`, `FastAPI`, `Vue 3 Composition API`)
- **Database and data layer** (e.g., `PostgreSQL with Prisma ORM`, `MongoDB with Mongoose`, `Redis for caching`)
- **Package manager** (e.g., `pnpm`, `npm`, `yarn`, `pip`, `cargo`)
- **Key integrations** (e.g., `Stripe for billing`, `Auth0 for authentication`, `AWS S3 for storage`)
- **Deployment target** (e.g., `Docker on AWS ECS`, `Vercel`, `Kubernetes on GKE`)
- **Testing tools** (e.g., `Vitest`, `Jest`, `pytest`, `Playwright for E2E`)

**Weak description:**
```
A web app with a backend and database
```

**Strong description:**
```
A multi-tenant project management SaaS built with Next.js 14 App Router (TypeScript, Tailwind CSS),
a NestJS REST API, PostgreSQL with Prisma ORM, Redis for caching and sessions, and Stripe for
subscription billing. Deployed on Vercel (frontend) and AWS ECS (backend). Uses Vitest and
Playwright for testing.
```

---

## 🔄 Enhance

When your project evolves — new libraries, new services, new architecture — your AI configs can fall behind. The `enhance` command reads your existing config files, compares them against the current project structure, and generates a prompt that tells your AI agent exactly what to update.

Open your AI agent chat and type:

```
Run npx @isonnymichael/bedrock enhance --tool <tool>
```

Or describe what changed:

```
Run npx @isonnymichael/bedrock enhance --tool <tool> --about "<what-changed>"
```

**Options:**

| Flag | Required | Description |
|------|----------|-------------|
| `-t, --tool <tool>` | Yes | AI tool to enhance. Choices: `claude`, `antigravity`, `trae`, `cursor` |
| `-a, --about <description>` | No | Describe what changed. If omitted, the AI infers changes from the project structure |

If no existing configuration is found for the given tool, Bedrock will tell you to run `init` first.

### Enhance Examples

Let the AI infer what changed:

```
Run npx @isonnymichael/bedrock enhance --tool trae
```

Describe what changed explicitly:

```
Run npx @isonnymichael/bedrock enhance --tool claude --about "Added Redis caching and switched from REST to GraphQL"
```

```
Run npx @isonnymichael/bedrock enhance --tool antigravity --about "Added a Python ML inference service alongside the existing Node.js API"
```

```
Run npx @isonnymichael/bedrock enhance --tool cursor --about "Migrated from Webpack to Vite, upgraded to React 19 and TypeScript 5.5"
```

```
Run npx @isonnymichael/bedrock enhance --tool trae --about "Introduced Kubernetes for deployment, added Helm charts, and set up GitHub Actions CI/CD pipelines"
```

### What the AI will do

1. **Update the master guide** — Reflect new frameworks, libraries, services, or architectural changes
2. **Update tech stack references** — Correct outdated versions, tools, or package names
3. **Add missing rules** — Generate rules for newly introduced technologies not yet covered
4. **Remove stale rules** — Delete or rewrite rules for removed dependencies or old patterns
5. **Preserve customizations** — Keep all existing custom rules and team-specific decisions that are still valid
6. **Fill gaps** — Generate any expected config files that are missing entirely

---

## 🤖 Supported AI Tools

| Tool | Value | Config Location | Files Generated |
|------|-------|----------------|-----------------|
| **Claude Code** | `claude` | `.claude/` | `CLAUDE.md`, rules, slash commands, skills |
| **Antigravity (Gemini)** | `antigravity` | `.agents/` | `GEMINI.md`, rules, workflows, skills |
| **Trae** | `trae` | `.trae/` | `AGENTS.md`, rules, prompts |
| **Cursor** | `cursor` | `.cursor/rules/` | `.mdc` rule files for all categories |

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

## 💡 Tips

**Be specific with your tech stack.**
Bedrock uses your `--about` description to tailor every generated file. Vague descriptions produce generic configs; detailed ones produce configs your AI agent can actually enforce.

**Run it on a fresh project before writing any code.**
The best time to initialize is before you start. Bedrock sets the conventions your AI agent will follow from day one, preventing config drift and inconsistency later.

**Use `enhance` when your stack changes, not `init`.**
Added a new framework, switched ORMs, or introduced a new service? Run `bedrock enhance` — it reads your existing configs and updates only what has changed, preserving your customizations. Use `init` only for fresh setups.

**Commit the generated files.**
Check the generated config folder (`.claude/`, `.agents/`, `.trae/`, `.cursor/rules/`) into version control. This ensures every teammate and CI environment gets the same AI behavior.

**Combine with your AI agent's context window.**
After Bedrock generates the configs, point your AI agent to the master guide file (e.g., `CLAUDE.md`, `GEMINI.md`) at the start of each session to ensure it loads the full project context.

**One tool at a time.**
If your team uses multiple AI tools, run `bedrock init` once per tool. Each run generates a separate, self-contained config folder — they don't conflict.

---

## 📁 Project Structure

```
bedrock/
├── bin/
│   └── bedrock.cjs          # CLI entrypoint
├── src/
│   ├── index.js             # Commander.js program setup
│   ├── commands/
│   │   ├── init.js          # `bedrock init` command logic
│   │   └── enhance.js       # `bedrock enhance` command logic
│   ├── generators/
│   │   ├── antigravity.js   # Init prompt generator for Antigravity (Gemini)
│   │   ├── claude.js        # Init prompt generator for Claude Code
│   │   ├── cursor.js        # Init prompt generator for Cursor
│   │   ├── trae.js          # Init prompt generator for Trae
│   │   └── enhance.js       # Enhance prompt generator (all tools)
│   └── utils/
│       ├── fs-helpers.js    # File system utilities
│       └── config-reader.js # Reads existing AI config files
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

# Test locally (direct execution — for development only, not normal usage)
node bin/bedrock.cjs init --tool antigravity --about "my project"
```

### Adding a New Generator

1. Create a new file in `src/generators/<tool-name>.js`
2. Export a `generate<ToolName>(context)` async function that returns a prompt string
3. Import and wire it up in `src/commands/init.js`

The `context` object passed to every generator contains:

```js
{
  isFresh: Boolean,        // true if project has no existing files
  projectAbout: String,    // user-provided project description (may be empty)
  projectStructure: String // scanned directory tree (existing projects only)
}
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| [`commander`](https://github.com/tj/commander.js) | CLI argument parsing |
| [`kleur`](https://github.com/lukeed/kleur) | Terminal color output |

---

## 📄 License

GPL-3.0 © Sonny Michael
