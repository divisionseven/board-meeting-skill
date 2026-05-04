# Board Meeting Skill — Cursor Setup

This guide gets you from zero to your first board meeting in under five minutes.

---

## Prerequisites

- [Cursor](https://cursor.sh) installed (v0.40 or later recommended for full
  Agent mode support)
- A project directory

---

## Install

Cursor rules are project-scoped by default. Copy the rule files and templates
into `.cursor/rules/`.

```sh
# From the root of your project:

# 1. Create the Cursor rules directories
mkdir -p .cursor/rules/board-members
mkdir -p .cursor/rules/board-meeting/templates

# 2. Copy the main board-meeting rule
cp board-meeting-skill/cursor/rules/board-meeting.mdc \
   .cursor/rules/

# 3. Copy the board member rules (Chairman + 10 members)
cp board-meeting-skill/cursor/rules/board-members/*.mdc \
   .cursor/rules/board-members/

# 4. Copy the report templates
cp board-meeting-skill/cursor/rules/board-meeting/templates/*.md \
   .cursor/rules/board-meeting/templates/
```

After running these commands, your project should contain:

```
.cursor/
+-- rules/
    +-- board-meeting.mdc              <- Main skill rule
    +-- board-meeting/
    |   +-- templates/
    |       +-- 01-directives-report.md
    |       +-- 02-first-session.md
    |       +-- 03-second-session.md
    |       +-- 04-chairman-synthesis.md
    +-- board-members/
        +-- board-chairman.mdc
        +-- board-member-01-architect.mdc
        +-- board-member-02-red-teamer.mdc
        +-- board-member-03-optimizer.mdc
        +-- board-member-04-advocate.mdc
        +-- board-member-05-contrarian.mdc
        +-- board-member-06-custodian.mdc
        +-- board-member-07-data-steward.mdc
        +-- board-member-08-chaos-agent.mdc
        +-- board-member-09-operator.mdc
        +-- board-member-10-minimalist.mdc
```

---

## About Cursor Rules

All `.mdc` files use YAML frontmatter with `alwaysApply: false` and a
`description:` field. Cursor uses the description to apply rules automatically
in Agent mode when a conversation matches — you do not need to manually
@-mention rules for the skill to activate.

The `board-meeting.mdc` main rule and all board member rules are **agent-
requested rules** — Cursor injects them into context when relevant, not on
every message.

---

## Using the Skill

**@-mention to invoke directly:**
```
@board-meeting — run a board meeting on this task
```

**@-mention the Chairman to start pre-flight:**
```
@board-chairman — run pre-flight for this architectural decision
```

**Natural language triggers (Agent mode auto-applies the rule):**
> *"Call a board meeting on this"*  
> *"Get the board together before we proceed"*  
> *"I want multiple perspectives on this"*  
> *"Run this through the board"*

**What happens next:**  
Cursor activates the Board Chairman rule. The Chairman runs pre-flight, reads
your codebase, drafts the Directives Report, and waits for your approval before
dispatching the board.

---

## Important: Use Agent Mode

The Board Meeting protocol requires file read/write access. Run it in
**Agent mode** (not Chat mode) — Agent mode gives the Chairman the tool access
it needs to create the `board_meetings/` folder structure and write reports.

Cursor's Agent mode also supports multi-step orchestration, which the Chairman
uses to coordinate Sessions 1 and 2.

---

## Verify the Install

In a Cursor Agent session, type:
```
@board-meeting — start
```

You should see the Board Chairman activate and begin pre-flight. If the rule is
not applied, check that `board-meeting.mdc` is in `.cursor/rules/` and that
Cursor's rule indexing has picked up the new files (you may need to restart
Cursor or reopen the project).

---

## Where Board Meeting Records Are Saved

Records are created at:
```
board_meetings/BM_{task}_{datetime}/
```
in your project root. This path can be changed in `board-members/board-chairman.mdc`.

---

## Customising the Skill

**Adjust complexity thresholds** — Edit the `When to Call a Board Meeting`
section of `.cursor/rules/board-meeting.mdc`.

**Modify a persona** — Edit the relevant `.mdc` file in
`.cursor/rules/board-members/`. The content between the frontmatter delimiters
is the full persona instruction.

**Add a custom board member** — Create a new `.mdc` file in `board-members/`,
following the existing structure, and update `board-meeting.mdc` and
`board-chairman.mdc` to include the new member.
