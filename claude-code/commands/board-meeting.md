# /board-meeting — Convene a Board Meeting

Invoke this command to trigger a structured multi-agent Board Meeting for any
complex technical task. The Board Chairman will take over from this point,
running the full meeting lifecycle: pre-flight assessment, folder setup,
dispatching all 10 board members in parallel, and producing the final synthesis.

---

## What This Command Does

When you run `/board-meeting`, Claude Code will:

1. **Activate the Board Chairman** (`agents/board-chairman.md`) who owns the
   entire meeting lifecycle.
2. **Run pre-flight:** The Chairman scores the task, gathers context, drafts
   the Directives Report, and asks for your approval before proceeding.
3. **Create the meeting folder** at `board_meetings/BM_{task}_{datetime}/`
   with the approved Directives Report and empty session folders.
4. **Dispatch all 10 board members simultaneously** (parallel subagents, each
   writing to their own file in `session_1/`).
5. **Run Session 2** — each member reads all Session 1 reports, then writes
   their refined analysis to `session_2/`.
6. **Chairman synthesizes** — reads all 20 reports, writes
   `chairman_final_report.md`.
7. **Handoff** — Chairman presents a 5–7 sentence Executive Summary and asks
   how you want to proceed.

---

## When to Use This Command

Call `/board-meeting` (or just describe what you're working on and Claude will
trigger it automatically) when your task scores ≥5/10 on ANY of:

| Dimension       | ≥5 means...                                                       |
| --------------- | ----------------------------------------------------------------- |
| Scope           | Touches multiple modules, systems, or data flows                  |
| Ambiguity       | Requirements unclear or interpretable multiple ways               |
| Irreversibility | Hard or expensive to undo                                         |
| Novelty         | Not a pattern established in this codebase                        |
| Risk Surface    | Security, performance, data integrity, or reliability at stake    |
| Duration        | Estimated >4 hours of implementation time                         |

Also use it whenever you want a second (and third, fourth... eleventh) opinion
before committing to a technical direction.

---

## Agents Involved

The Board Chairman orchestrates 11 agents total:

| Agent                  | File                                    | Lens                        |
| ---------------------- | --------------------------------------- | --------------------------- |
| Board Chairman         | `agents/board-chairman.md`              | Orchestration + Synthesis   |
| The Architect          | `agents/board-member-01-architect.md`   | Structure + Scalability     |
| The Red Teamer         | `agents/board-member-02-red-teamer.md`  | Security + Threats          |
| The Optimizer          | `agents/board-member-03-optimizer.md`   | Performance + Complexity    |
| The Advocate           | `agents/board-member-04-advocate.md`    | UX + Ergonomics             |
| The Contrarian         | `agents/board-member-05-contrarian.md`  | First Principles            |
| The Custodian          | `agents/board-member-06-custodian.md`   | Tech Debt + Maintainability |
| The Data Steward       | `agents/board-member-07-data-steward.md`| Data Integrity + Schemas    |
| The Chaos Agent        | `agents/board-member-08-chaos-agent.md` | Failure Modes + Resilience  |
| The Operator           | `agents/board-member-09-operator.md`    | Deployment + Operations     |
| The Minimalist         | `agents/board-member-10-minimalist.md`  | Simplicity + YAGNI          |

---

## Templates

Reference templates are in `templates/`:

- `templates/01-directives-report.md` — Chairman uses in Phase 0
- `templates/02-first-session.md` — All 10 members use in Session 1
- `templates/03-second-session.md` — All 10 members use in Session 2
- `templates/04-chairman-synthesis.md` — Chairman uses in Phase 3

---

## Output Structure

```
board_meetings/
└── BM_{task}_{datetime}/
    ├── directives_report.md
    ├── session_1/
    │   └── {10 member reports}
    ├── session_2/
    │   └── {10 member reports}
    └── chairman_final_report.md
```

---

Begin: Activate the Board Chairman and run pre-flight for the current task.
