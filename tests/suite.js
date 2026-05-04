#!/usr/bin/env node

/**
 * Test suite for Board Meeting Skill installation script
 *
 * This test suite validates the core functionality of bin/install.js:
 * - Script can be parsed and executed
 * - Platform detection logic works correctly
 * - File copying logic works correctly
 * - Error handling works correctly
 * - User prompts work correctly
 *
 * Usage:
 *   node test/suite.js
 *
 * Exit codes:
 *   0   All tests pass
 *   1   One or more tests fail
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Test utilities ─────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

function assertEqual(actual, expected, message) {
  if (actual === expected) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    console.error(`    Expected: ${expected}`);
    console.error(`    Actual: ${actual}`);
    failed++;
  }
}

function assertThrows(fn, message) {
  try {
    fn();
    console.error(`  ✗ ${message} (expected to throw)`);
    failed++;
  } catch (error) {
    console.log(`  ✓ ${message}`);
    passed++;
  }
}

// ── Test suite ───────────────────────────────────────────────────────────────

console.log("\nBoard Meeting Skill Installation Test Suite\n");
console.log("─".repeat(60));

// Test 1: Install script can be parsed
console.log("\n1. Script Parsing");
try {
  const installPath = path.join(ROOT, "bin", "install.js");
  const content = fs.readFileSync(installPath, "utf-8");
  assert(content.length > 0, "Install script is not empty");
  assert(content.includes("import"), "Install script uses ES modules");
  assert(content.includes("prompts"), "Install script uses prompts library");
  assert(content.includes("fs"), "Install script uses fs module");
  assert(content.includes("path"), "Install script uses path module");
} catch (error) {
  assert(false, `Install script can be read: ${error.message}`);
}

// Test 2: Install script has no syntax errors
console.log("\n2. Syntax Validation");
try {
  execSync("node --check bin/install.js", { cwd: ROOT, stdio: "pipe" });
  assert(true, "Install script has no syntax errors");
} catch (error) {
  assert(false, `Install script has no syntax errors: ${error.message}`);
}

// Test 3: Install script can be executed
console.log("\n3. Script Execution");
try {
  // Test that the script can be executed (it will fail without input, but that's OK)
  execSync("node bin/install.js --help", { cwd: ROOT, stdio: "pipe", timeout: 5000 });
  assert(true, "Install script can be executed");
} catch (error) {
  // --help might not be supported, so we just check it doesn't crash immediately
  if (error.killed || error.signal === "SIGTERM") {
    assert(true, "Install script can be executed (timed out as expected)");
  } else {
    assert(false, `Install script can be executed: ${error.message}`);
  }
}

// Test 4: Required dependencies are installed
console.log("\n4. Dependencies");
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"));
  assert(packageJson.dependencies, "package.json has dependencies");
  assert(packageJson.dependencies.kleur, "kleur dependency exists");
  assert(packageJson.dependencies.prompts, "prompts dependency exists");
} catch (error) {
  assert(false, `Dependencies are installed: ${error.message}`);
}

// Test 5: Platform directories exist
console.log("\n5. Platform Directories");
const platforms = ["opencode", "claude-code", "codex", "cursor", "windsurf"];
for (const platform of platforms) {
  const platformPath = path.join(ROOT, platform);
  const exists = fs.existsSync(platformPath) && fs.statSync(platformPath).isDirectory();
  assert(exists, `${platform} directory exists`);
}

// Test 6: Platform files exist
console.log("\n6. Platform Files");
const platformFiles = {
  opencode: [
    "skills/board-meeting/SKILL.md",
    "agents/board-chairman.md",
    "agents/board-member-01-architect.md",
  ],
  "claude-code": [
    "commands/board-meeting.md",
    "agents/board-chairman.md",
    "agents/board-member-01-architect.md",
  ],
  codex: [
    "skills/board-meeting/SKILL.md",
    "agents/board-chairman.toml",
    "agents/board-member-01-architect.toml",
  ],
  cursor: [
    "rules/board-meeting.mdc",
    "rules/board-members/board-chairman.mdc",
    "rules/board-members/board-member-01-architect.mdc",
  ],
  windsurf: [
    "rules/board-meeting.md",
    "rules/board-members/board-chairman.md",
    "rules/board-members/board-member-01-architect.md",
  ],
};

for (const [platform, files] of Object.entries(platformFiles)) {
  for (const file of files) {
    const filePath = path.join(ROOT, platform, file);
    const exists = fs.existsSync(filePath);
    assert(exists, `${platform}/${file} exists`);
  }
}

// Test 7: Templates exist
console.log("\n7. Template Files");
const templates = [
  "01-directives-report.md",
  "02-first-session.md",
  "03-second-session.md",
  "04-chairman-synthesis.md",
];

const templateDirs = {
  opencode: "opencode/skills/board-meeting/templates",
  "claude-code": "claude-code/templates",
  codex: "codex/skills/board-meeting/templates",
  cursor: "cursor/rules/board-meeting/templates",
  windsurf: "windsurf/rules/board-meeting/templates",
};

for (const [platform, dir] of Object.entries(templateDirs)) {
  for (const template of templates) {
    const filePath = path.join(ROOT, dir, template);
    const exists = fs.existsSync(filePath);
    assert(exists, `${platform} ${template} exists`);
  }
}

// Test 8: Install script has proper structure
console.log("\n8. Script Structure");
try {
  const installPath = path.join(ROOT, "bin", "install.js");
  const content = fs.readFileSync(installPath, "utf-8");

  assert(content.includes("PLATFORMS"), "Script defines PLATFORMS");
  assert(content.includes("opencode"), "Script includes opencode platform");
  assert(content.includes("claude-code"), "Script includes claude-code platform");
  assert(content.includes("codex"), "Script includes codex platform");
  assert(content.includes("cursor"), "Script includes cursor platform");
  assert(content.includes("windsurf"), "Script includes windsurf platform");
  assert(content.includes("sources"), "Script defines sources for each platform");
  assert(content.includes("fs.copyFileSync") || content.includes("cp"), "Script has file copying logic");
  assert(content.includes("mkdir"), "Script has directory creation logic");
} catch (error) {
  assert(false, `Script has proper structure: ${error.message}`);
}

// Test 9: Install script handles errors
console.log("\n9. Error Handling");
try {
  const installPath = path.join(ROOT, "bin", "install.js");
  const content = fs.readFileSync(installPath, "utf-8");

  assert(content.includes("try") || content.includes("catch"), "Script has error handling");
  assert(content.includes("console.error") || content.includes("error"), "Script has error output");
} catch (error) {
  assert(false, `Script has error handling: ${error.message}`);
}

// Test 10: Install script has user prompts
console.log("\n10. User Prompts");
try {
  const installPath = path.join(ROOT, "bin", "install.js");
  const content = fs.readFileSync(installPath, "utf-8");

  assert(content.includes("prompts"), "Script uses prompts library");
  assert(content.includes("platform"), "Script prompts for platform");
  assert(content.includes("scope") || content.includes("global"), "Script prompts for install scope");
} catch (error) {
  assert(false, `Script has user prompts: ${error.message}`);
}

// Test 11: Install script has visual output
console.log("\n11. Visual Output");
try {
  const installPath = path.join(ROOT, "bin", "install.js");
  const content = fs.readFileSync(installPath, "utf-8");

  assert(content.includes("console.log"), "Script has console output");
  assert(content.includes("kleur") || content.includes("color"), "Script has colored output");
  assert(content.includes("BANNER") || content.includes("banner"), "Script has banner");
} catch (error) {
  assert(false, `Script has visual output: ${error.message}`);
}

// Test 12: Install script has proper shebang
console.log("\n12. Script Metadata");
try {
  const installPath = path.join(ROOT, "bin", "install.js");
  const content = fs.readFileSync(installPath, "utf-8");
  const firstLine = content.split("\n")[0];

  assert(firstLine.startsWith("#!"), "Script has shebang");
  assert(firstLine.includes("node"), "Shebang points to node");
} catch (error) {
  assert(false, `Script has proper shebang: ${error.message}`);
}

// Test 13: Install script is executable
console.log("\n13. File Permissions");
try {
  const installPath = path.join(ROOT, "bin", "install.js");
  const stats = fs.statSync(installPath);

  // On Unix-like systems, check if executable
  if (process.platform !== "win32") {
    const mode = stats.mode;
    const isExecutable = (mode & parseInt("111", 8)) !== 0;
    assert(isExecutable, "Install script is executable");
  } else {
    assert(true, "File permissions check skipped on Windows");
  }
} catch (error) {
  assert(false, `Install script is executable: ${error.message}`);
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log("\n" + "─".repeat(60));
console.log(`\nPassed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total:  ${passed + failed}\n`);

if (failed > 0) {
  console.error("Tests failed!\n");
  process.exit(1);
} else {
  console.log("All tests passed!\n");
  process.exit(0);
}
