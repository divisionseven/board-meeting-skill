---
name: board-meeting
description: >
  Convene a structured multi-agent "Board Meeting" for any task rated 5/10 or
  higher on complexity or scope. Triggered automatically when the orchestrating
  agent encounters: complex architectural decisions, major refactors, ambiguous
  technical strategy, new module design, multi-system integrations, performance
  bottlenecks, security design decisions, data schema decisions, or any task
  where tunnel vision is a credible risk. Also triggered directly by the user
  with phrases like "call a board meeting", "get the board together", "I want
  multiple perspectives on this", or "run this through the board". ALWAYS use
  this skill before embarking on any task that scores 5 or above on complexity.
  When in doubt, call the meeting. The cost of the meeting is always lower than
  the cost of solving the wrong problem.
---

# The Board Meeting Skill

## Research Foundation

This skill is grounded in three independently validated bodies of research:

**Scott E. Page — _The Diversity Bonus_ (Princeton University Press, 2017)**
Page's mathematical modeling demonstrates that on high-dimensional, complex,
nonroutine tasks — precisely the tasks that define meaningful software
engineering decisions — groups composed of people with _non-redundant cognitive
toolkits_ consistently outperform groups composed of the highest individual
performers by a single metric. Overlapping expertise creates overlapping blind
spots.

**Juliet Bourke — _Which Two Heads Are Better Than One?_** Bourke's field
research identified six Dimensions of Approach (DoAs) — outcomes, options,
people, process, evidence, and risk — that characterize how individuals and
groups frame and solve problems. Leadership groups are routinely dominated by
one or two DoAs (most commonly outcomes and options) while the others receive
far less attention than the complexity of the decisions actually demands.

**Architecture Review Board (ARB) Practice** AWS, TOGAF, LeanIX, and
industry-wide ARB research establish that: reviewing architectural decisions
_before_ implementation rather than after reduces costly rework; diverse
stakeholder representation (technical, operational, security, product) surfaces
issues that homogeneous groups miss; and formal structured review processes
reduce both technical debt and security events. The same principle applies to
any sufficiently complex coding decision.

The Board Meeting skill operationalises all three bodies of research in a
structured, repeatable, AI-native format.

---

## When to Call a Board Meeting

The Board Chairman **MUST** call a Board Meeting when a task scores ≥5/10 on
ANY of:

| Dimension       | ≥5 means...                                                       |
| --------------- | ----------------------------------------------------------------- |
| Scope           | Touches multiple modules, systems, or data flows                  |
| Ambiguity       | Requirements are unclear or could be interpreted multiple ways    |
| Irreversibility | The decision will be hard or expensive to undo                    |
| Novelty         | This is not a pattern already established in the codebase         |
| Risk Surface    | Security, performance, data integrity, or reliability is at stake |
| Duration        | Estimated >4 hours of implementation time                         |

The Chairman also calls a Board Meeting **immediately** when the user requests
it directly.

---

## The 10 Board Members

Each board member represents a distinct cognitive lens, grounded in real-world
technical personas. Full agent instructions are in `agents/`.

| #   | Codename             | Lens                                                         | Inspired By     |
| --- | -------------------- | ------------------------------------------------------------ | --------------- |
| 01  | **The Architect**    | Systems structure, scalability, long-term design integrity   | Martin Fowler   |
| 02  | **The Red Teamer**   | Adversarial thinking, threat modeling, attack surface        | Bruce Schneier  |
| 03  | **The Optimizer**    | Performance, algorithmic complexity, resource utilization    | Donald Knuth    |
| 04  | **The Advocate**     | User/developer experience, ergonomics, product value         | Paul Graham     |
| 05  | **The Contrarian**   | First-principles challenge, assumption-busting, alternatives | Richard Feynman |
| 06  | **The Custodian**    | Technical debt, maintainability, code health, longevity      | Ward Cunningham |
| 07  | **The Data Steward** | Data flows, schemas, integrity, migrations, state            | Joe Hellerstein |
| 08  | **The Chaos Agent**  | Failure modes, edge cases, resilience, observability         | Jesse Robbins   |
| 09  | **The Operator**     | Deployment, CI/CD, monitoring, operational burden, SRE       | Gene Kim        |
| 10  | **The Minimalist**   | Simplicity, YAGNI, over-engineering watchdog, clarity        | Rob Pike        |

**The Board Chairman** → Inspired by Charlie Munger's mental model framework.
Full instructions in `agents/board-chairman.md`.

---

## The Board Meeting Protocol — Step by Step

### Phase 0: Chairman Pre-Flight

The Board Chairman is the meeting's orchestrator from start to finish. Before
calling the board, the Chairman MUST:

1. **Assess complexity** using the table above. Score ≥5 on any dimension →
   call the meeting.
2. **Gather context.** Read relevant files, existing code, previous decisions,
   and any user-provided constraints. The Directives Report must be informative
   enough for board members to work without additional context.
3. **Ask the user for missing information** if the Directives Report cannot be
   completed with confidence. Keep questions focused and minimal — ask once, not
   repeatedly. Do not call the meeting until all mandatory fields can be filled.
4. **Draft the Board Meeting Directives Report** using Template 01 (see
   `templates/01-directives-report.md`).
5. **Present the Directives Report to the user for approval.** Do not spin up
   board members until the user approves or the Chairman has incorporated
   requested revisions.

### Phase 0b: Chairman Creates Board Meeting Folder Structure

After user approval of the Directives Report:

1. The Chairman creates the Board Meeting folder structure directly.
2. Folder path: `board_meetings/BM_{task}_{datetime}/`
   (e.g., `board_meetings/BM_architecture_20260401_143022/`)
3. The Chairman creates:
   - Root folder: `board_meetings/BM_{task}_{datetime}/`
   - Directives report file: `directives_report.md` (containing the approved
     Directives Report)
   - Session 1 folder: `session_1/` (EMPTY — no placeholder files inside)
   - Session 2 folder: `session_2/` (EMPTY — no placeholder files inside)
   - **NOTE:** `chairman_final_report.md` is created in Phase 3, NOT here
4. The Chairman stores the root folder path and passes it to EVERY board member
   in every subsequent phase.

**This folder is the single source of truth for the entire board meeting.**

> **Note on folder location:** Place `board_meetings/` wherever makes sense
> for your project. Common choices: project root, a `docs/` folder, or a
> dedicated `internal_docs/` directory. Pick a convention and stick to it.

---

### Phase 1: First Session (Simultaneous)

Once the Directives Report is approved:

1. Spin up all 10 board member agents **simultaneously** (parallel subagents).
2. Each agent receives: the approved Directives Report + their own persona
   instructions (from `agents/`) + the First Session Response template
   (Template 02, `templates/02-first-session.md`).
3. Each agent conducts whatever research or code analysis they need. They do
   NOT see each other's responses at this stage.
4. **For each board member:** Pass the root folder path along with their
   specific file path (`session_1/{codename}_session_1.md`). Each member
   CREATES their own file and WRITES their complete report to it.
5. The Chairman verifies all 10 Session 1 files exist and are filled before
   proceeding to Phase 2.

---

### Phase 2: Second Session (Simultaneous)

1. Spin up 10 fresh board member agents **simultaneously** (same personas, fresh
   context).
2. Each agent receives the root folder path and MUST READ all Session 1 reports
   before beginning their Session 2 analysis.
3. Agents conduct additional research as needed. They ARE encouraged to
   reference, challenge, or build on other members' first-session responses.
4. **For each board member:** Pass the root folder path and their Session 2
   file path (`session_2/{codename}_session_2.md`). Each member CREATES their
   file and WRITES their report to it.
5. The Chairman verifies all 10 Session 2 files exist and are filled before
   proceeding to Phase 3.

---

### Phase 3: Chairman's Synthesis

1. The Chairman reads ALL session files (`session_1/*.md` and
   `session_2/*.md`) before beginning the synthesis.
2. The Chairman conducts their analysis — identifying strengths, weaknesses,
   convergences, divergences, and producing actionable recommendations.
3. The Chairman writes their complete Final Meeting Synthesis Report into
   `chairman_final_report.md` in the root folder.
4. The Chairman verifies `chairman_final_report.md` is present and filled.
5. This completed folder is the **Final Board Meeting Record**.

---

### Phase 4: Chairman's Handoff

1. The Chairman presents the Final Board Meeting Record to the user (reference
   the folder path: `board_meetings/BM_{task}_{datetime}/`).
2. The Chairman writes a brief **Executive Summary** (5–7 sentences maximum) of
   the key recommendations and the most important convergent insights.
3. The Chairman asks the user how they want to proceed:
   - Use the board's output to redirect research
   - Use it to construct a plan of attack
   - Use it to trigger a more focused brainstorming session
   - Proceed directly to implementation using the board's recommendations
4. The skill is complete. The meeting record is available for future reference.

---

## Folder Structure Reference

```
board_meetings/
└── BM_{task}_{datetime}/          # Root folder — created in Phase 0b
    ├── directives_report.md       # Approved Directives Report — Phase 0b
    ├── session_1/                 # EMPTY at creation, populated in Phase 1
    │   ├── architect_session_1.md
    │   ├── red_teamer_session_1.md
    │   ├── optimizer_session_1.md
    │   ├── advocate_session_1.md
    │   ├── contrarian_session_1.md
    │   ├── custodian_session_1.md
    │   ├── data_steward_session_1.md
    │   ├── chaos_agent_session_1.md
    │   ├── operator_session_1.md
    │   └── minimalist_session_1.md
    ├── session_2/                 # EMPTY at creation, populated in Phase 2
    │   ├── architect_session_2.md
    │   ├── red_teamer_session_2.md
    │   ├── optimizer_session_2.md
    │   ├── advocate_session_2.md
    │   ├── contrarian_session_2.md
    │   ├── custodian_session_2.md
    │   ├── data_steward_session_2.md
    │   ├── chaos_agent_session_2.md
    │   ├── operator_session_2.md
    │   └── minimalist_session_2.md
    └── chairman_final_report.md   # Created and written by Chairman in Phase 3
```

---

## Templates

All four templates are stored as separate files in this skill's `templates/`
directory. They are also embedded in the corresponding agent files for
convenience so agents have them available without an extra read.

- **`templates/01-directives-report.md`** — Used by the Chairman when
  preparing the Board Meeting brief (Phase 0).
- **`templates/02-first-session.md`** — Used by all 10 board members during
  Session One (Phase 1). Also embedded in each board member agent file.
- **`templates/03-second-session.md`** — Used by all 10 board members during
  Session Two (Phase 2). Also embedded in each board member agent file.
- **`templates/04-chairman-synthesis.md`** — Used by the Board Chairman in
  Phase 3. Also embedded in the `agents/board-chairman.md` file.

---

## Agent Locations

```
agents/board-chairman.md
agents/board-member-01-architect.md
agents/board-member-02-red-teamer.md
agents/board-member-03-optimizer.md
agents/board-member-04-advocate.md
agents/board-member-05-contrarian.md
agents/board-member-06-custodian.md
agents/board-member-07-data-steward.md
agents/board-member-08-chaos-agent.md
agents/board-member-09-operator.md
agents/board-member-10-minimalist.md
```

---

## Board Chairman Checklist

**Before calling the meeting:**

- [ ] Task scored ≥5/10 on at least one complexity dimension
- [ ] All relevant files, code, and context have been read
- [ ] Directives Report drafted with all mandatory fields complete
- [ ] User has approved the Directives Report
- [ ] Board meeting folder structure created and root path stored
- [ ] All 11 agent files loaded and ready to pass to subagents
- [ ] All 4 templates loaded and ready to pass to subagents

**After Session 1:**

- [ ] Root folder path passed to all 10 board members with Session 1 write
      instructions
- [ ] All 10 Session 1 files verified present and filled
      (`session_1/{codename}_session_1.md`)

**After Session 2:**

- [ ] Root folder path passed to all 10 board members with Session 2 write
      instructions
- [ ] All 10 Session 2 files verified present and filled
      (`session_2/{codename}_session_2.md`)

**After Chairman Synthesis:**

- [ ] All Session 1 and Session 2 files read before beginning synthesis
- [ ] `chairman_final_report.md` written and verified present
- [ ] Final Board Meeting Record is complete
- [ ] Executive Summary written (5–7 sentences)
- [ ] User has been asked how to proceed

---

## Per-Agent File Assignments

Each board member is assigned a specific file path for each session. These
paths are passed by the Chairman during delegation.

**IMPORTANT:** The Chairman creates EMPTY `session_1/` and `session_2/`
folders. Each board member CREATES their own file and WRITES their report.
Files are NOT pre-populated with placeholders.

### Session 1 Files (Phase 1)

| Board Member     | Full Path Pattern                            | Action                    |
| ---------------- | -------------------------------------------- | ------------------------- |
| The Architect    | `{root}/session_1/architect_session_1.md`    | CREATE file, WRITE report |
| The Red Teamer   | `{root}/session_1/red_teamer_session_1.md`   | CREATE file, WRITE report |
| The Optimizer    | `{root}/session_1/optimizer_session_1.md`    | CREATE file, WRITE report |
| The Advocate     | `{root}/session_1/advocate_session_1.md`     | CREATE file, WRITE report |
| The Contrarian   | `{root}/session_1/contrarian_session_1.md`   | CREATE file, WRITE report |
| The Custodian    | `{root}/session_1/custodian_session_1.md`    | CREATE file, WRITE report |
| The Data Steward | `{root}/session_1/data_steward_session_1.md` | CREATE file, WRITE report |
| The Chaos Agent  | `{root}/session_1/chaos_agent_session_1.md`  | CREATE file, WRITE report |
| The Operator     | `{root}/session_1/operator_session_1.md`     | CREATE file, WRITE report |
| The Minimalist   | `{root}/session_1/minimalist_session_1.md`   | CREATE file, WRITE report |

### Session 2 Files (Phase 2)

| Board Member     | Full Path Pattern                            | Action                    |
| ---------------- | -------------------------------------------- | ------------------------- |
| The Architect    | `{root}/session_2/architect_session_2.md`    | CREATE file, WRITE report |
| The Red Teamer   | `{root}/session_2/red_teamer_session_2.md`   | CREATE file, WRITE report |
| The Optimizer    | `{root}/session_2/optimizer_session_2.md`    | CREATE file, WRITE report |
| The Advocate     | `{root}/session_2/advocate_session_2.md`     | CREATE file, WRITE report |
| The Contrarian   | `{root}/session_2/contrarian_session_2.md`   | CREATE file, WRITE report |
| The Custodian    | `{root}/session_2/custodian_session_2.md`    | CREATE file, WRITE report |
| The Data Steward | `{root}/session_2/data_steward_session_2.md` | CREATE file, WRITE report |
| The Chaos Agent  | `{root}/session_2/chaos_agent_session_2.md`  | CREATE file, WRITE report |
| The Operator     | `{root}/session_2/operator_session_2.md`     | CREATE file, WRITE report |
| The Minimalist   | `{root}/session_2/minimalist_session_2.md`   | CREATE file, WRITE report |

### Root-Level Files

| File                       | Full Path Pattern                 | When Created | Who Creates/Writes |
| -------------------------- | --------------------------------- | ------------ | ------------------ |
| `directives_report.md`     | `{root}/directives_report.md`     | Phase 0b     | Chairman           |
| `chairman_final_report.md` | `{root}/chairman_final_report.md` | Phase 3      | Chairman           |

**Where `{root}` =** `board_meetings/BM_{task}_{datetime}/`

**Delegation example (from Chairman to The Architect in Phase 1):**

> "Your Session 1 report file is: `{root}/session_1/architect_session_1.md`.
> CREATE this file if it doesn't exist, then WRITE your complete First Session
> Response Report to it. Read the Directives Report at
> `{root}/directives_report.md` first."
