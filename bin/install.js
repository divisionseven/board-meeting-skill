#!/usr/bin/env node

import fs from "fs";
import kleur from "kleur";
import path from "path";
import prompts from "prompts";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Visual banner ──────────────────────────────────────────────────────────

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

// ─── Platform config ─────────────────────────────────────────────────────────

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

// ─── File operations ──────────────────────────────────────────────────────────

function copyDir(src, dest) {
  const absSrc  = path.resolve(ROOT, src);
  const absDest = path.resolve(process.cwd(), dest.replace(/^~/, process.env.HOME));

  if (!fs.existsSync(absSrc)) {
    warn(`Source not found, skipping: ${src}`);
    return { fileCount: 0 };
  }

  fs.mkdirSync(absDest, { recursive: true });

  let fileCount = 0;

  function recurse(currentSrc, currentDest) {
    const entries = fs.readdirSync(currentSrc, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath  = path.join(currentSrc,  entry.name);
      const destPath = path.join(currentDest, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        recurse(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        fileCount++;
      }
    }
  }

  recurse(absSrc, absDest);
  return { fileCount };
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

  // 3. Confirm
  console.log();
  console.log(kleur.dim("  The following directories will be created:"));
  console.log();
  for (const s of sources) {
    console.log(`    ${kleur.green("+")} ${s.to}/`);
  }
  console.log();

  const { confirmed } = await prompts(
    {
      type:    "confirm",
      name:    "confirmed",
      message: "Proceed with installation?",
      initial: true,
    },
    { onCancel }
  );

  if (!confirmed) {
    onCancel();
  }

  // 4. Install
  console.log();
  let totalFiles = 0;
  const installedDirs = [];

  for (const { from, to } of sources) {
    step(`Installing ${from} → ${to}/`);
    const { fileCount } = copyDir(from, to);
    totalFiles += fileCount;
    installedDirs.push(to + "/");
    success(`${fileCount} files installed`);
  }

  // 5. Summary
  printSummary(config.label, { fileCount: totalFiles, dirs: installedDirs });

  console.log(kleur.bold().white("  Next steps:\n"));
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
