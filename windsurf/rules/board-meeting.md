---
trigger: model_decision
description: >
  Convene a structured multi-agent "Board Meeting" for any complex technical
  task. Triggered when Cascade encounters: complex architectural decisions,
  major refactors, ambiguous technical strategy, new module design, multi-system
  integrations, performance bottlenecks, security design decisions, data schema
  decisions, or any task scoring ≥5/10 on complexity. Also triggered by user
  phrases like "call a board meeting", "get the board together", "I want
  multiple perspectives", or "run this through the board".
---

# The Board Meeting Skill

This rule defines a structured multi-agent review protocol. The Board Chairman
orchestrates the full lifecycle: pre-flight, folder setup, parallel board
sessions, and final synthesis.

---

## Research Foundation

**Scott E. Page — _The Diversity Bonus_:** Groups with non-redundant cognitive
toolkits consistently outperform groups of individually high performers on
complex tasks. Overlapping expertise creates overlapping blind spots.

**Juliet Bourke — _Which Two Heads Are Better Than One?_:** Six Dimensions of
Approach (outcomes, options, people, process, evidence, risk) are rarely all
represented in technical decision-making.

**Architecture Review Board (ARB) Practice:** Reviewing decisions before
implementation reduces rework. Diverse representation surfaces issues
homogeneous groups miss.

---

## When to Call a Board Meeting

Score ≥5/10 on ANY of:

| Dimension       | ≥5 means...                                                       |
| --------------- | ----------------------------------------------------------------- |
| Scope           | Touches multiple modules, systems, or data flows                  |
| Ambiguity       | Requirements are unclear or could be interpreted multiple ways    |
| Irreversibility | The decision will be hard or expensive to undo                    |
| Novelty         | This is not a pattern already established in the codebase         |
| Risk Surface    | Security, performance, data integrity, or reliability is at stake |
| Duration        | Estimated >4 hours of implementation time                         |

---

## The 10 Board Members + Chairman

| #    | Codename             | Lens                                                         | Inspired By     |
| ---- | -------------------- | ------------------------------------------------------------ | --------------- |
| —    | **The Chairman**     | Orchestration, synthesis, and final recommendation           | Charlie Munger  |
| 01   | **The Architect**    | Systems structure, scalability, long-term design integrity   | Martin Fowler   |
| 02   | **The Red Teamer**   | Adversarial thinking, threat modeling, attack surface        | Bruce Schneier  |
| 03   | **The Optimizer**    | Performance, algorithmic complexity, resource utilization    | Donald Knuth    |
| 04   | **The Advocate**     | User/developer experience, ergonomics, product value         | Paul Graham     |
| 05   | **The Contrarian**   | First-principles challenge, assumption-busting, alternatives | Richard Feynman |
| 06   | **The Custodian**    | Technical debt, maintainability, code health, longevity      | Ward Cunningham |
| 07   | **The Data Steward** | Data flows, schemas, integrity, migrations, state            | Joe Hellerstein |
| 08   | **The Chaos Agent**  | Failure modes, edge cases, resilience, observability         | Jesse Robbins   |
| 09   | **The Operator**     | Deployment, CI/CD, monitoring, operational burden, SRE       | Gene Kim        |
| 10   | **The Minimalist**   | Simplicity, YAGNI, over-engineering watchdog, clarity        | Rob Pike        |

---

## Windsurf Setup Notes

Windsurf uses `.windsurf/rules/` for project-level rules. Each rule is a
markdown file with YAML frontmatter. This rule set uses **`model_decision`
trigger** so Cascade applies rules when relevant, not always.

Board member persona rules are in `.windsurf/rules/board-members/`.

Template reference files are in `.windsurf/rules/board-meeting/templates/`.

**Invoking the meeting:** Reference `@board-meeting` in Cascade, or say "call
a board meeting" — Cascade will load this rule and the board member rules as
needed.

---

## Board Meeting Protocol

### Phase 0: Chairman Pre-Flight

Reference the Chairman rule: `@board-chairman` and instruct Cascade to run the
Board Meeting pre-flight. The Chairman will:

1. Score the task on all 6 complexity dimensions
2. Read all relevant context and code
3. Ask for any missing information
4. Draft the Board Meeting Directives Report (Template 01)
5. Present it for approval

### Phase 0b: Setup

After approval, the Chairman creates:
```
board_meetings/BM_{task}_{datetime}/
├── directives_report.md
├── session_1/
└── session_2/
```

### Phase 1: First Session (Parallel)

Chairman spawns all 10 board members simultaneously. Each reads the Directives
Report and writes their First Session Response (Template 02) to `session_1/`.

### Phase 2: Second Session (Parallel)

Each member reads all Session 1 reports and writes their Second Session Final
Thoughts (Template 03) to `session_2/`.

### Phase 3: Chairman's Synthesis

Chairman reads all 20 reports and writes the Final Synthesis (Template 04) to
`chairman_final_report.md`.

### Phase 4: Handoff

Chairman presents Executive Summary and asks how to proceed.

---

## Templates

Located in `.windsurf/rules/board-meeting/templates/`:

- `01-directives-report.md` — Board Meeting brief
- `02-first-session.md` — Session 1 report structure
- `03-second-session.md` — Session 2 report structure
- `04-chairman-synthesis.md` — Final synthesis structure

---

## Folder Structure

```
board_meetings/
└── BM_{task}_{datetime}/
    ├── directives_report.md
    ├── session_1/        (10 member files)
    ├── session_2/        (10 member files)
    └── chairman_final_report.md
```
