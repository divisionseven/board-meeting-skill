#!/usr/bin/env node

import fs from "fs";
import kleur from "kleur";
import path from "path";
import prompts from "prompts";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Visual Banner ──────────────────────────────────────────────────────────

const BANNER = `
${kleur.red("╔══════════════════════════════════════════════════════════════════════╗")}
${kleur.red("║                                                                      ║")}
${kleur.red("║")}              ${kleur.bold().white("██████╗  ██████╗  █████╗ ██████╗ ██████╗")}                ${kleur.red("║")}
${kleur.red("║")}              ${kleur.bold().white("██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗")}               ${kleur.red("║")}
${kleur.red("║")}              ${kleur.bold().white("██████╔╝██║   ██║███████║██████╔╝██║  ██║")}               ${kleur.red("║")}
${kleur.red("║")}              ${kleur.bold().white("██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║")}               ${kleur.red("║")}
${kleur.red("║")}              ${kleur.bold().white("██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝")}               ${kleur.red("║")}
${kleur.red("║")}              ${kleur.bold().white("╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝")}                ${kleur.red("║")}
${kleur.red("║                                                                      ║")}
${kleur.red("║")}      ${kleur.bold().white("███╗   ███╗███████╗███████╗████████╗██╗███╗   ██╗ ██████╗")}       ${kleur.red("║")}
${kleur.red("║")}      ${kleur.bold().white("████╗ ████║██╔════╝██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝")}       ${kleur.red("║")}
${kleur.red("║")}      ${kleur.bold().white("██╔████╔██║█████╗  █████╗     ██║   ██║██╔██╗ ██║██║  ███╗")}      ${kleur.red("║")}
${kleur.red("║")}      ${kleur.bold().white("██║╚██╔╝██║██╔══╝  ██╔══╝     ██║   ██║██║╚██╗██║██║   ██║")}      ${kleur.red("║")}
${kleur.red("║")}      ${kleur.bold().white("██║ ╚═╝ ██║███████╗███████╗   ██║   ██║██║ ╚████║╚██████╔╝")}      ${kleur.red("║")}
${kleur.red("║")}      ${kleur.bold().white("╚═╝     ╚═╝╚══════╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝")}       ${kleur.red("║")}
${kleur.red("║                                                                      ║")}
${kleur.red("║")}                  ${kleur.bold().white("M U L T I - A G E N T   S K I L L")}                   ${kleur.red("║")}
${kleur.red("║                                                                      ║")}
${kleur.red("╚══════════════════════════════════════════════════════════════════════╝")}
`;

function step(msg) {
  console.log(kleur.cyan("  →") + "  " + msg);
}

function success(msg) {
  console.log(kleur.green("  ✓") + "  " + msg);
}

function warn(msg) {
  console.log(kleur.yellow("  ⚠") + "  " + msg);
}

function printSummary(platform, targets) {
  console.log();
  console.log(kleur.bold().white("  Installation complete."));
  console.log();
  console.log(`  ${kleur.dim("Platform:")}  ${kleur.bold(platform)}`);
  console.log(`  ${kleur.dim("Files:")}     ${kleur.bold(targets.fileCount)} files installed`);
  console.log();
  for (const dir of targets.dirs) {
    console.log(`  ${kleur.green("+")} ${kleur.dim(dir)}`);
  }
  console.log();
}

// ─── Platform Config ─────────────────────────────────────────────────────────

const PLATFORMS = {
  opencode: {
    label: "OpenCode",
    sources: [
      { from: "opencode/skills",  to: ".opencode/skills"  },
      { from: "opencode/agents",  to: ".opencode/agents"  },
    ],
    globalSources: [
      { from: "opencode/skills",  to: "~/.config/opencode/skills" },
      { from: "opencode/agents",  to: "~/.config/opencode/agents" },
    ],
    verify: 'Type "What skills do you have available?" in OpenCode to confirm.',
    trigger: 'Say "call a board meeting" or describe a complex task.',
  },
  "claude-code": {
    label: "Claude Code",
    sources: [
      { from: "claude-code/commands",  to: ".claude/commands"  },
      { from: "claude-code/agents",    to: ".claude/agents"    },
      { from: "claude-code/templates", to: ".claude/templates" },
    ],
    globalSources: [
      { from: "claude-code/commands",  to: "~/.claude/commands"  },
      { from: "claude-code/agents",    to: "~/.claude/agents"    },
      { from: "claude-code/templates", to: "~/.claude/templates" },
    ],
    verify: 'Run /board-meeting in a Claude Code session to confirm.',
    trigger: 'Type /board-meeting or say "call a board meeting".',
  },
  codex: {
    label: "OpenAI Codex",
    sources: [
      { from: "codex/agents",         to: ".codex/agents"              },
      { from: "codex/skills",         to: ".agents/skills"             },
    ],
    globalSources: [
      { from: "codex/agents",         to: "~/.codex/agents"            },
      { from: "codex/skills",         to: "~/.agents/skills"           },
    ],
    verify: 'Type $board-meeting in a Codex session to confirm.',
    trigger: 'Type $board-meeting or say "call a board meeting".',
  },
  cursor: {
    label: "Cursor",
    sources: [
      { from: "cursor/rules", to: ".cursor/rules" },
    ],
    globalSources: [
      { from: "cursor/rules", to: "~/.cursor/rules" },
    ],
    verify: 'Type "@board-meeting — start" in a Cursor Agent session.',
    trigger: 'Say "call a board meeting" or type @board-meeting.',
  },
  windsurf: {
    label: "Windsurf",
    sources: [
      { from: "windsurf/rules", to: ".windsurf/rules" },
    ],
    globalSources: [
      { from: "windsurf/rules", to: "~/.windsurf/rules" },
    ],
    verify: 'Type "@board-meeting — start" in a Cascade session.',
    trigger: 'Say "call a board meeting" or type @board-meeting.',
  },
};

// ─── File Operations ──────────────────────────────────────────────────────────

function copyDir(src, dest) {
  const absSrc = path.resolve(ROOT, src);
  const absDest = path.resolve(process.cwd(), dest.replace(/^~/, process.env.HOME));

  if (!fs.existsSync(absSrc)) {
    warn(`Source not found, skipping: ${src}`);
    return { fileCount: 0, overwritten: 0, backedUp: 0 };
  }

  fs.mkdirSync(absDest, { recursive: true });

  let fileCount = 0;
  let overwritten = 0;
  let backedUp = 0;

  function recurse(currentSrc, currentDest) {
    const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(currentSrc, entry.name);
      const destPath = path.join(currentDest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        recurse(srcPath, destPath);
      } else {
        fileCount++;

        // Safety: Backup if file exists
        if (fs.existsSync(destPath)) {
          const backupDir = path.join(path.dirname(destPath), ".backup");
          fs.mkdirSync(backupDir, { recursive: true });

          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const backupPath = path.join(backupDir, `${entry.name}.${timestamp}.bak`);

          fs.copyFileSync(destPath, backupPath);
          overwritten++;
          backedUp++;
        }

        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  recurse(absSrc, absDest);
  return { fileCount, overwritten, backedUp };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(BANNER);
  console.log(
    kleur.dim("  10 Perspectives | 2 Sessions | 1 Final Report\n") +
    kleur.dim("  Stop letting tunnel vision win — Call a board meeting.\n")
  );

  // Cancelled handler
  const onCancel = () => {
    console.log("\n" + kleur.dim("  Aborted. Nothing was installed.\n"));
    process.exit(0);
  };

  // 1. Platform selection
  const { platform } = await prompts(
    {
      type:    "select",
      name:    "platform",
      message: "Which platform are you installing for?",
      choices: [
        { title: "OpenCode",       value: "opencode"     },
        { title: "Claude Code",    value: "claude-code"  },
        { title: "OpenAI Codex",   value: "codex"        },
        { title: "Cursor",         value: "cursor"       },
        { title: "Windsurf",       value: "windsurf"     },
      ],
    },
    { onCancel }
  );

  const config = PLATFORMS[platform];

  // 2. Scope selection
  const { scope } = await prompts(
    {
      type:    "select",
      name:    "scope",
      message: "Install for this project or globally?",
      choices: [
        {
          title:       "This project",
          description: `Copies files into ${config.sources[0].to}/`,
          value:       "project",
        },
        {
          title:       "Global (all projects)",
          description: `Copies files into ${config.globalSources[0].to}/`,
          value:       "global",
        },
      ],
    },
    { onCancel }
  );

  const sources = scope === "project" ? config.sources : config.globalSources;

  // Preview phase
  console.log();
  console.log(kleur.bold().white("  Installation preview:"));
  console.log();

  let totalFiles = 0;
  const conflicts = [];

  for (const { from, to } of sources) {
    const absSrc = path.resolve(ROOT, from);
    const absDest = path.resolve(process.cwd(), to.replace(/^~/, process.env.HOME));

    if (fs.existsSync(absSrc)) {
      console.log(`    ${kleur.green("+")} ${to}/`);
      // Simple conflict check
      if (fs.existsSync(absDest)) {
        const existing = fs.readdirSync(absDest);
        const incoming = fs.readdirSync(absSrc);
        const overlap = incoming.filter(f => existing.includes(f));
        if (overlap.length > 0) {
          conflicts.push({ to, files: overlap });
        }
      }
    }
  }

  if (conflicts.length > 0) {
    warn("Some files will be overwritten:");
    for (const c of conflicts) {
      console.log(`    ${kleur.yellow("→")} ${c.to}/`);
      c.files.forEach(f => console.log(`        ${kleur.dim("•")} ${f}`));
    }
    console.log(kleur.dim("      Backups will be created in .backup/ folders"));
  }

  const { confirmed } = await prompts({
    type: "confirm",
    name: "confirmed",
    message: conflicts.length > 0
      ? "Proceed with installation (backups will be created)?"
      : "Proceed with installation?",
    initial: true,
  }, { onCancel });

  if (!confirmed) {
    onCancel();
  }

  // Actual install
  console.log();
  let totalOverwritten = 0;
  let totalBackedUp = 0;
  const installedDirs = [];

  for (const { from, to } of sources) {
    step(`Installing ${from} → ${to}/`);
    const result = copyDir(from, to);
    totalFiles += result.fileCount;
    totalOverwritten += result.overwritten;
    totalBackedUp += result.backedUp;
    installedDirs.push(to + "/");
    success(`${result.fileCount} files installed`);
  }

  // Summary
  console.log();
  console.log(kleur.bold().white("  Installation complete."));
  console.log();
  console.log(`  ${kleur.dim("Platform:")}  ${kleur.bold(config.label)}`);
  console.log(`  ${kleur.dim("Files:")}     ${kleur.bold(totalFiles)} total`);

  if (totalOverwritten > 0) {
    console.log(`  ${kleur.yellow("Overwritten:")} ${totalOverwritten} files (backups created)`);
  }

  console.log();
  for (const dir of installedDirs) {
    console.log(`  ${kleur.green("+")} ${dir}`);
  }

  // Next steps message
  console.log(kleur.bold().white("\n  Next steps:\n"));
  console.log(`  ${kleur.cyan("1.")} Restart your ${config.label} session`);
  console.log(`  ${kleur.cyan("2.")} ${config.verify}`);
  console.log(`  ${kleur.cyan("3.")} ${config.trigger}`);
  console.log();
  console.log(
    kleur.dim("  Full docs: https://github.com/divisionseven/board-meeting-skill\n")
  );
}

main().catch((err) => {
  console.error(kleur.red("\n  Installation failed:"), err.message);
  process.exit(1);
});
