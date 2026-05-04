# Board Meeting Skill — OpenCode Setup

This guide gets you from zero to your first board meeting in under five minutes.

---

## Prerequisites

- [OpenCode](https://opencode.ai) installed and configured
- A project you are working in (or the global config path for cross-project use)

---

## Project-Scoped Install

Installs the skill for the current project only. Recommended for most users —
it keeps the skill alongside the code it is reviewing.

```sh
# From the root of your project:

# 1. Create the OpenCode directories if they don't exist
mkdir -p .opencode/skills .opencode/agents

# 2. Copy the skill (entrypoint + protocol + templates)
cp -r board-meeting-skill/opencode/skills/board-meeting .opencode/skills/

# 3. Copy the agents (Chairman + 10 board members)
cp board-meeting-skill/opencode/agents/*.md .opencode/agents/
```

After running these commands, your project should contain:

```
.opencode/
+-- skills/
|   +-- board-meeting/
|       +-- SKILL.md
|       +-- templates/
|           +-- 01-directives-report.md
|           +-- 02-first-session.md
|           +-- 03-second-session.md
|           +-- 04-chairman-synthesis.md
+-- agents/
    +-- board-chairman.md
    +-- board-member-01-architect.md
    +-- board-member-02-red-teamer.md
    +-- board-member-03-optimizer.md
    +-- board-member-04-advocate.md
    +-- board-member-05-contrarian.md
    +-- board-member-06-custodian.md
    +-- board-member-07-data-steward.md
    +-- board-member-08-chaos-agent.md
    +-- board-member-09-operator.md
    +-- board-member-10-minimalist.md
```

---

## Global Install

Makes the skill available in every OpenCode project on your machine.

```sh
mkdir -p ~/.config/opencode/skills ~/.config/opencode/agents

cp -r board-meeting-skill/opencode/skills/board-meeting \
      ~/.config/opencode/skills/

cp board-meeting-skill/opencode/agents/*.md \
   ~/.config/opencode/agents/
```

---

## Using the Skill

Once installed, OpenCode reads the skill description and triggers the Board
Meeting automatically when your task matches the trigger conditions. You can
also invoke it explicitly:

**Explicit invocation:**
> *"Call a board meeting on this"*  
> *"Get the board together before we proceed"*  
> *"Run this through the board"*

**What happens next:**  
OpenCode activates the Board Chairman, who runs the pre-flight, drafts the
Directives Report, and waits for your approval before spinning up the full
board. You stay in control at the approval gate — the meeting does not proceed
until you sign off on the brief.

---

## Verify the Install

In an OpenCode session, ask:

```
What skills do you have available?
```

You should see `board-meeting` in the list. If not, check that `SKILL.md` is
at `.opencode/skills/board-meeting/SKILL.md` and restart your OpenCode session.

---

## Where Board Meeting Records Are Saved

By default, the Board Meeting folder is created at:

```
board_meetings/BM_{task}_{datetime}/
```

in your project root. You can change this convention — just update the path
reference in `agents/board-chairman.md` and note your preference in the
Directives Report for board members.

---

## Customising the Skill

**Adjust complexity thresholds** — Edit the `When to Call a Board Meeting`
table in `SKILL.md`.

**Modify a persona** — Edit the relevant `agents/board-member-XX-*.md` file.
Each file contains the full persona: philosophy, analytical framework,
vigilance checklist, and session-specific file path instructions.

**Add a custom board member** — Create a new agent file following the
existing structure, add the member to the board table in `SKILL.md`, and
update `agents/board-chairman.md` to include them in the dispatch protocol.
