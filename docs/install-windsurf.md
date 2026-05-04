# Board Meeting Skill — Windsurf Setup

This guide gets you from zero to your first board meeting in under five minutes.

---

## Prerequisites

- [Windsurf](https://codeium.com/windsurf) installed (version with Cascade
  multi-agent support recommended)
- A project directory

---

## Install

Windsurf rules are project-scoped. Copy the rule files and templates into
`.windsurf/rules/`.

```sh
# From the root of your project:

# 1. Create the Windsurf rules directories
mkdir -p .windsurf/rules/board-members
mkdir -p .windsurf/rules/board-meeting/templates

# 2. Copy the main board-meeting rule
cp board-meeting-skill/windsurf/rules/board-meeting.md \
   .windsurf/rules/

# 3. Copy the board member rules (Chairman + 10 members)
cp board-meeting-skill/windsurf/rules/board-members/*.md \
   .windsurf/rules/board-members/

# 4. Copy the report templates
cp board-meeting-skill/windsurf/rules/board-meeting/templates/*.md \
   .windsurf/rules/board-meeting/templates/
```

After running these commands, your project should contain:

```
.windsurf/
+-- rules/
    +-- board-meeting.md               <- Main skill rule
    +-- board-meeting/
    |   +-- templates/
    |       +-- 01-directives-report.md
    |       +-- 02-first-session.md
    |       +-- 03-second-session.md
    |       +-- 04-chairman-synthesis.md
    +-- board-members/
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

## About Windsurf Rules

All rule files use YAML frontmatter with `trigger: model_decision` and a
`description:` field. The `model_decision` trigger means Cascade applies these
rules when it determines they are relevant to the current task — not on every
message. This keeps context windows lean while ensuring the skill activates
when it is genuinely needed.

---

## Using the Skill

**@-reference the skill in Cascade:**
```
@board-meeting — run a board meeting on this task
```

**@-reference the Chairman to start pre-flight directly:**
```
@board-chairman — run pre-flight for this architectural decision
```

**Natural language triggers:**
> *"Call a board meeting on this"*  
> *"Get the board together before we proceed"*  
> *"I want multiple perspectives on this decision"*  
> *"Run this through the board"*

**What happens next:**  
Cascade applies the `board-meeting.md` rule and activates the Board Chairman.
The Chairman runs pre-flight, reads your codebase, drafts the Directives
Report, and waits for your approval before dispatching any board members.

---

## Important: Enable Write Access

The Board Meeting protocol creates files and folders during the meeting. Make
sure Cascade has **write access enabled** for your project — the Chairman and
board members need to create the `board_meetings/` folder structure and write
their reports during the session.

---

## Verify the Install

In a Cascade session, type:
```
@board-meeting — start
```

You should see the Board Chairman activate and begin pre-flight. If the rule
is not applied, verify that `board-meeting.md` is at
`.windsurf/rules/board-meeting.md` and restart Windsurf or reopen the project
to trigger rule re-indexing.

---

## Where Board Meeting Records Are Saved

Records are created at:
```
board_meetings/BM_{task}_{datetime}/
```
in your project root. This path can be changed in
`board-members/board-chairman.md`.

---

## Customising the Skill

**Adjust complexity thresholds** — Edit the `When to Call a Board Meeting`
table in `.windsurf/rules/board-meeting.md`.

**Modify a persona** — Edit the relevant `.md` file in
`.windsurf/rules/board-members/`. The content below the frontmatter block is
the full persona instruction.

**Add a custom board member** — Create a new `.md` file in `board-members/`
following the existing structure, and update `board-meeting.md` and
`board-chairman.md` to include the new member in the dispatch protocol.
