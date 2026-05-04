# Board Meeting Skill — OpenAI Codex Setup

This guide gets you from zero to your first board meeting in under five minutes.

---

## Prerequisites

- [OpenAI Codex](https://openai.com/codex) installed and configured
- A project directory, or your global `~/.codex/` path for cross-project use

---

## Project-Scoped Install

```sh
# From the root of your project:

# 1. Create the Codex agent directory
mkdir -p .codex/agents

# 2. Copy the agent TOML files (Chairman + 10 board members)
cp board-meeting-skill/codex/agents/*.toml .codex/agents/

# 3. Copy the skill and templates
mkdir -p .agents/skills/board-meeting
cp -r board-meeting-skill/codex/skills/board-meeting/ \
      .agents/skills/board-meeting/
```

After running these commands, your project should contain:

```
.codex/
+-- agents/
    +-- board-chairman.toml
    +-- board-member-01-architect.toml
    +-- board-member-02-red-teamer.toml
    +-- board-member-03-optimizer.toml
    +-- board-member-04-advocate.toml
    +-- board-member-05-contrarian.toml
    +-- board-member-06-custodian.toml
    +-- board-member-07-data-steward.toml
    +-- board-member-08-chaos-agent.toml
    +-- board-member-09-operator.toml
    +-- board-member-10-minimalist.toml

.agents/
+-- skills/
    +-- board-meeting/
        +-- SKILL.md
        +-- templates/
            +-- 01-directives-report.md
            +-- 02-first-session.md
            +-- 03-second-session.md
            +-- 04-chairman-synthesis.md
```

---

## Global Install

```sh
mkdir -p ~/.codex/agents

cp board-meeting-skill/codex/agents/*.toml ~/.codex/agents/

mkdir -p ~/.agents/skills
cp -r board-meeting-skill/codex/skills/board-meeting \
      ~/.agents/skills/
```

---

## About the TOML Agent Format

Each Codex agent is a `.toml` file with two sections:

```toml
[agent]
nickname_candidates = ["board-chairman"]
description = "..."

[instructions]
system = """
...full persona instructions...
"""
```

The `nickname_candidates` field controls how you reference the agent in a Codex
session. You can invoke the Board Chairman by typing `$board-chairman`, or you
can describe what you want and Codex will match the skill automatically.

---

## Using the Skill

**Invoke by skill name:**
```
$board-meeting
```

**Invoke the Chairman directly:**
```
Spawn the board-chairman agent and run a Board Meeting pre-flight for this task.
```

**Natural language triggers:**
> *"Call a board meeting on this"*  
> *"I want multiple perspectives before we commit to this direction"*  
> *"Run this through the board"*

**What happens next:**
The Board Chairman runs pre-flight, drafts the Directives Report, and waits for
your approval. Once approved, it dispatches all 10 board members simultaneously
across Sessions 1 and 2, then synthesizes the output into the Final Report.

---

## How Codex Runs the Parallel Sessions

Codex's native parallel agent execution handles Sessions 1 and 2. The Chairman
instructs Codex to spawn all 10 board member agents simultaneously — each with
its own TOML persona loaded, each writing to its own dedicated file. No custom
tooling or scripting is required.

---

## Verify the Install

In a Codex session, type:
```
$board-meeting
```

You should see the Board Chairman activate. If the skill is not found, confirm
that the `.toml` files are in `.codex/agents/` and that `SKILL.md` is at
`.agents/skills/board-meeting/SKILL.md`.

---

## Where Board Meeting Records Are Saved

Records are created at:
```
board_meetings/BM_{task}_{datetime}/
```
in your project root. This path can be changed in `board-chairman.toml`.

---

## Customising the Skill

**Adjust complexity thresholds** — Edit the `When to Call a Board Meeting`
table in `SKILL.md`.

**Modify a persona** — Edit the `[instructions] system` field in the relevant
`.toml` file.

**Add a custom board member** — Create a new `.toml` file following the
existing structure, and update `SKILL.md` and `board-chairman.toml` to include
the new member in the dispatch protocol.
