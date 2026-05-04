# Board Meeting Skill — Claude Code Setup

This guide gets you from zero to your first board meeting in under five minutes.

---

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
  (`npm install -g @anthropic-ai/claude-code`)
- A project directory, or your global `~/.claude/` path for cross-project use

---

## Project-Scoped Install

Installs the skill for the current project only. Keeps the skill co-located
with the code it is reviewing — the recommended approach.

```sh
# From the root of your project:

# 1. Create the Claude Code directories
mkdir -p .claude/commands .claude/agents .claude/templates

# 2. Copy the /board-meeting slash command
cp board-meeting-skill/claude-code/commands/board-meeting.md \
   .claude/commands/

# 3. Copy the agents (Chairman + 10 board members)
cp board-meeting-skill/claude-code/agents/*.md .claude/agents/

# 4. Copy the report templates
cp board-meeting-skill/claude-code/templates/*.md .claude/templates/
```

After running these commands, your project should contain:

```
.claude/
+-- commands/
|   +-- board-meeting.md       <- /board-meeting slash command
+-- agents/
|   +-- board-chairman.md
|   +-- board-member-01-architect.md
|   +-- board-member-02-red-teamer.md
|   +-- board-member-03-optimizer.md
|   +-- board-member-04-advocate.md
|   +-- board-member-05-contrarian.md
|   +-- board-member-06-custodian.md
|   +-- board-member-07-data-steward.md
|   +-- board-member-08-chaos-agent.md
|   +-- board-member-09-operator.md
|   +-- board-member-10-minimalist.md
+-- templates/
    +-- 01-directives-report.md
    +-- 02-first-session.md
    +-- 03-second-session.md
    +-- 04-chairman-synthesis.md
```

---

## Global Install

Makes the skill available across all Claude Code projects on your machine.

```sh
mkdir -p ~/.claude/commands ~/.claude/agents ~/.claude/templates

cp board-meeting-skill/claude-code/commands/board-meeting.md \
   ~/.claude/commands/

cp board-meeting-skill/claude-code/agents/*.md ~/.claude/agents/

cp board-meeting-skill/claude-code/templates/*.md ~/.claude/templates/
```

---

## Using the Skill

**Via slash command:**
```
/board-meeting
```

**Natural language triggers:**
> *"Call a board meeting on this"*
> *"I want the board's perspective before we proceed"*
> *"Run this through the board"*

**What happens next:**
The Board Chairman activates and runs pre-flight — scoring the task complexity,
reading your codebase, drafting the Directives Report, and presenting it to you
for approval. The full board is not dispatched until you approve the brief.

---

## How Claude Code Runs the Parallel Sessions

Claude Code's subagent system handles the parallel execution. When the Chairman
dispatches Session 1, Claude Code spawns all 10 board member agents
simultaneously — each working independently, each writing to their own
dedicated file in `session_1/`. Session 2 runs the same way, with each member
having first read all ten Session 1 reports.

Each agent file in `.claude/agents/` carries complete persona instructions, so
agents do not need additional context from the parent session to work correctly.

---

## Verify the Install

In a Claude Code session, type:
```
/board-meeting
```

You should see the Board Chairman activate and begin pre-flight. If the command
is not recognized, check that `board-meeting.md` is in `.claude/commands/`
(project) or `~/.claude/commands/` (global) and start a new session.

---

## Where Board Meeting Records Are Saved

Records are created at:
```
board_meetings/BM_{task}_{datetime}/
```
in your project root. This path can be changed in `agents/board-chairman.md`.

---

## customizing the Skill

**Adjust complexity thresholds** — Edit the `When to Use This Command` section
of `commands/board-meeting.md`.

**Modify a persona** — Edit the relevant file in `agents/`. Each file is
self-contained: full instructions, vigilance checklist, and session directives.

**Add a custom board member** — Create a new agent file, then update
`commands/board-meeting.md` and `agents/board-chairman.md` to include the new
member in the dispatch protocol.
