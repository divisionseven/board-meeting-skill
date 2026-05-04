# Board Meeting Directives Report

## Template 01 — Completed by: The Board Chairman

---

> **PURPOSE:** This document is the single source of truth for the Board
> Meeting. It goes out to all 10 board members simultaneously before Session
> One. It must be complete, precise, and self-contained. Board members have no
> other context unless the Chairman provides links or code excerpts within this
> document. Every field marked [MANDATORY] must be filled. Optional fields
> should be filled when the information is known and relevant.
>
> **WHEN TO USE:** The Board Chairman fills this out in Phase 0 before calling
> the Board Meeting. Present the completed report to the user for approval
> before proceeding to Phase 0b.

---

## 1. Meeting Header

| Field                | Value                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| **Meeting ID**       | BM-YYYY-MM-DD_HHMMSS                                                        |
| **Date Called**      | [ISO date and time]                                                         |
| **Convened By**      | Board Chairman                                                              |
| **Task Title**       | [Short, specific title for this task — not "help with code"]                |
| **Complexity Score** | [X]/10 — [one-sentence justification]                                       |
| **Estimated Scope**  | [e.g., "2–3 files, ~300 lines of new code, touches the ingestion pipeline"] |
| **Decision Urgency** | [Low / Medium / High — and why]                                             |

---

## 2. Problem Statement [MANDATORY]

_Write 2–4 precise paragraphs. The goal is not to propose a solution — it is to
describe the problem with enough precision that a board member who has never
seen this codebase before understands exactly what we are trying to accomplish
and why it is non-trivial._

**Context:** [What is the broader project or system? What does it do? Who uses
it?]

**The Specific Challenge:** [What specific problem, decision, or task are we
calling this meeting to address? Be concrete. Include filenames, module names,
function names where relevant.]

**Why This Is Non-Trivial:** [What makes this hard? What have we already tried
or considered? What constraints exist that make the obvious solution
insufficient?]

**What "Done" Looks Like:** [What is the definition of success? What should
exist after this task is complete that does not exist now?]

---

## 3. Codebase Snapshot [MANDATORY if applicable]

_Paste relevant code excerpts, file structures, or schema definitions here. If
the codebase is too large to paste, provide a high-level structural summary and
identify the specific files most relevant to this task._

**Relevant Files / Modules:**

```
[file path] — [one-line description of its role]
[file path] — [one-line description of its role]
```

**Key Code Excerpts:**

```[language]
[Paste the most relevant code here. Use comments to annotate unclear sections.]
```

**Data Structures / Schemas (if relevant):**

```[language or JSON/YAML]
[Paste relevant schemas, models, or data structures]
```

---

## 4. Current Known Constraints [MANDATORY]

_List every constraint that is non-negotiable. Board members must treat these as
hard limits, not suggestions._

**Technology Constraints:**

- Language/runtime: [e.g., Python 3.12, Node.js 22, Go 1.23]
- Key dependencies: [libraries, frameworks that must be used]
- Dependencies that MUST NOT be introduced: [any banned or undesirable
  additions]

**Performance Constraints:**

- [e.g., "Must handle 10,000 concurrent requests without semaphore starvation"]
- [e.g., "Target: <200ms P99 latency on the ingest path"]

**Compatibility Constraints:**

- [e.g., "Must remain backward-compatible with existing database schema"]
- [e.g., "Must not break existing CLI interface"]

**Operational Constraints:**

- [e.g., "Single-node deployment, no Kubernetes"]
- [e.g., "Must be restartable without data loss"]

**Other Hard Limits:**

- [Security requirements, compliance, licensing, etc.]

---

## 5. Options Already Considered [MANDATORY if any exist]

_For each option the user or calling agent has already evaluated, briefly
summarize:_

**Option A: [Name]**

- Description: [what it is]
- Why it was considered: [what made it attractive]
- Why it was not selected (or why it is still open): [the blocker or
  uncertainty]

**Option B: [Name]**

- Description:
- Why it was considered:
- Why it was not selected:

_(Add more as needed. If no options have been considered yet, write: "No prior
options evaluated. Board members are asked to generate and assess their own
candidate approaches.")_

---

## 6. Open Questions [MANDATORY]

_List every question that remains genuinely unanswered. These are the specific
questions the Board Meeting is called to illuminate. Be specific._

1. [Question one]
2. [Question two]
3. [Question three]
4. [Add as many as needed — there is no maximum]

---

## 7. Risks and Concerns Already Identified [OPTIONAL]

_If the user or calling agent has already identified risks, list them here so
board members can build on this awareness rather than rediscovering it._

| Risk               | Severity         | Notes                             |
| ------------------ | ---------------- | --------------------------------- |
| [Risk description] | Low / Med / High | [Any mitigation already planned?] |

---

## 8. Special Instructions for Board Members [OPTIONAL]

_Use this section to give specific guidance about focus areas, things to
ignore, or particular angles that need exploring._

- [e.g., "Pay special attention to the concurrency model — this has caused bugs
  before"]
- [e.g., "Ignore cost optimization — that is not a constraint on this project"]
- [e.g., "The Chaos Agent should specifically explore what happens if the DB
  goes down mid-run"]

---

## 9. Output Expectations [MANDATORY]

**What the Board is being asked to produce:** Each board member must complete
the First Session Response Report (Template 02) in full, following their
assigned persona. Board members should not hedge or equivocate — they are
expected to take clear positions, even provisional ones, and to justify those
positions with reasoning. Disagreement between members is not only acceptable,
it is the point.

**What the Board is NOT being asked to produce:** Finished code. Implementation.
A final answer. The purpose of Session One is to surface every relevant
consideration from every cognitive angle. The Chairman will synthesize. The
calling agent will act.

---

_— End of Board Meeting Directives Report —_
_Approved by user before distribution to board members._
