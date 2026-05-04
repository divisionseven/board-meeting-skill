---
name: board-meeting
description: >
  Convene a structured multi-agent "Board Meeting" for any task rated 5/10 or
  higher on complexity or scope. Trigger this skill when encountering: complex
  architectural decisions, major refactors, ambiguous technical strategy, new
  module design, multi-system integrations, performance bottlenecks, security
  design decisions, data schema decisions, or any task where tunnel vision is a
  credible risk. Also triggered directly by the user with phrases like "call a
  board meeting", "get the board together", "I want multiple perspectives on
  this", or "run this through the board". When in doubt, call the meeting. The
  cost of the meeting is always lower than the cost of solving the wrong problem.
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
reduce both technical debt and security events.

The Board Meeting skill operationalises all three bodies of research in a
structured, repeatable, AI-native format.

---

## Codex Setup Notes

**Agent files:** Codex uses TOML files for custom agents. They are located in
`.codex/agents/` (project-scoped) or `~/.codex/agents/` (global). Each `.toml`
file defines one board member or the Chairman.

**Skill location:** Place this skill folder at `.agents/skills/board-meeting/`
for project-scoped use, or in your global Codex skills directory for use across
all projects.

**Invoking the meeting:** Type `$board-meeting` to invoke the skill explicitly,
or describe your task and Codex will trigger the skill automatically when the
description matches.

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

## Board Meeting Protocol

### Phase 0: Chairman Pre-Flight

The Board Chairman (defined in `.codex/agents/board-chairman.toml`) runs the
pre-flight. Ask Codex: "Spawn the board-chairman agent to run the Board Meeting
pre-flight for this task."

The Chairman will:
1. Score the task against the complexity dimensions
2. Read all relevant context and code
3. Ask for any missing information
4. Draft the Board Meeting Directives Report (Template 01)
5. Present it for your approval

### Phase 0b: Setup

After approval, the Chairman creates:
```
board_meetings/BM_{task}_{datetime}/
├── directives_report.md
├── session_1/
└── session_2/
```

### Phase 1: First Session (Parallel)

The Chairman spawns all 10 board members simultaneously. Codex supports
parallel subagent execution — each member writes to their own file in
`session_1/`.

### Phase 2: Second Session (Parallel)

Each member reads all Session 1 reports, then writes their refined analysis
to `session_2/`.

### Phase 3: Chairman's Synthesis

The Chairman reads all 20 reports and writes `chairman_final_report.md`.

### Phase 4: Handoff

The Chairman presents the Executive Summary and asks how to proceed.

---

## Templates

Four templates are in the `templates/` subdirectory:

- `templates/01-directives-report.md` — Board Meeting brief (Chairman, Phase 0)
- `templates/02-first-session.md` — Session 1 report (all 10 members)
- `templates/03-second-session.md` — Session 2 report (all 10 members)
- `templates/04-chairman-synthesis.md` — Final synthesis (Chairman, Phase 3)

---

## Agent Files

Custom agents for Codex are TOML files in `.codex/agents/`:

```
.codex/agents/
├── board-chairman.toml
├── board-member-01-architect.toml
├── board-member-02-red-teamer.toml
├── board-member-03-optimizer.toml
├── board-member-04-advocate.toml
├── board-member-05-contrarian.toml
├── board-member-06-custodian.toml
├── board-member-07-data-steward.toml
├── board-member-08-chaos-agent.toml
├── board-member-09-operator.toml
└── board-member-10-minimalist.toml
```

See each `.toml` file for full persona instructions and session directives.

---

## Folder Structure

```
board_meetings/
└── BM_{task}_{datetime}/
    ├── directives_report.md
    ├── session_1/
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
    ├── session_2/
    │   └── [same 10 files, _session_2.md]
    └── chairman_final_report.md
```
