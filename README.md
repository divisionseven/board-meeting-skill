<div align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/divisionseven/board-meeting-skill/main/docs/assets/logo-black.svg">
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/divisionseven/board-meeting-skill/main/docs/assets/logo-white.svg">
    <img src="https://raw.githubusercontent.com/divisionseven/board-meeting-skill/main/docs/assets/logo-white.svg" alt="board-meeting-skill-logo" width="600">
  </picture>

# Board Meeting

### You and your agent have tunnel vision. Let's fix that.

*A structured multi-agent deliberation system for AI coding platforms.*
*Before your agent writes a single line of code on anything complex, convene the board.*

[![Sessions][sessions-badge-icon]][sessions-badge-link]
[![Board Members][board-members-badge-icon]][board-members-badge-link]
[![Platforms][platforms-badge-icon]][platforms-badge-link]

[![License][license-badge-icon]][license-badge-link]
[![Release][release-badge-icon]][release-badge-link]
[![Build][build-badge-icon]][build-badge-link]

</div>

## Quick Install

```sh
npx board-meeting-skill
```

That's it. The installer asks which platform you are on, whether you want a
project-scoped or global install, and copies exactly the right files to exactly
the right places. No manual steps.

Supports: **OpenCode**, **Claude Code**, **Codex**, **Cursor**, and **Windsurf**.

*[View npm page &rarr;][npm-package-link]*

> [!Note]
> **Want to install it manually instead?**
> - [Claude Code Manual Installation Guide &rarr;](/docs/install-claude-code.md)
> - [Codex Manual Installation Guide &rarr;](/docs/install-codex.md)
> - [Cursor Manual Installation Guide &rarr;](/docs/install-cursor.md)
> - [OpenCode Manual Installation Guide &rarr;](/docs/install-opencode.md)
> - [Windsurf Manual Installation Guide &rarr;](/docs/install-windsurf.md)

## The Problem

AI coding assistants are exceptional at what they do. But they suffer from the
same failure mode as any single expert: **tunnel vision**.

When your assistant reasons about a complex architectural decision, it brings
one set of priors, one dominant framing, and one direction of reasoning. It
might think about structure — but miss the security implications. It might
optimize for performance — but introduce a schema migration nightmare. It might
build something elegant — that no one will be able to operate at 3 AM.

This is not a failure of intelligence. It is a failure of **cognitive
diversity**. And it is exactly the same problem that plagues human engineering
teams.

**The research on this is unambiguous.**

## The Research

This skill is grounded in three independently validated bodies of work:

**Scott E. Page — *The Diversity Bonus* (Princeton, 2017)**
Page's mathematical proof: on complex, non-routine tasks, groups with
*non-redundant cognitive tool kits* consistently outperform groups composed of
the single highest-performing individuals. The mechanism is simple — overlapping
expertise creates overlapping blind spots.

**Juliet Bourke — *Which Two Heads Are Better Than One?***
Bourke's field research identified six Dimensions of Approach that characterize
how people frame and solve problems: outcomes, options, people, process,
evidence, and risk. Technical leadership groups are systematically dominated by
*outcomes* and *options*. Process, evidence, and risk receive a fraction of the
attention the complexity of the decisions actually demands.

**Architecture Review Board practice** (AWS, TOGAF, LeanIX)
Reviewing architectural decisions *before* implementation — not after — reduces
costly rework. Diverse stakeholder representation surfaces issues homogeneous
groups miss. Formal review processes reduce both technical debt and security
events.

The Board Meeting skill operationalize all three in a structured, repeatable,
AI-native format. It does not add bureaucracy. It adds the cognitive diversity
that makes the difference between a good decision and a great one.

## The Board

Eleven agents. Eleven distinct cognitive lenses. Grounded in the real-world
intellectual frameworks of their inspirations.

| ROLE             | LENS                            | INSPIRED BY     |
| ---------------- | ------------------------------- | --------------- |
| Board Chairman   | Orchestration & synthesis       | Charlie Munger  |
| The Architect    | Structure & long-term design    | Martin Fowler   |
| The Red Teamer   | Threats & attack surface        | Bruce Schneier  |
| The Optimizer    | Performance & complexity        | Donald Knuth    |
| The Advocate     | UX, ergonomics & product value  | Paul Graham     |
| The Contrarian   | First principles & assumptions  | Richard Feynman |
| The Custodian    | Tech debt & maintainability     | Ward Cunningham |
| The Data Steward | Data flows, schemas & integrity | Joe Hellerstein |
| The Chaos Agent  | Failure modes & resilience      | Jesse Robbins   |
| The Operator     | Deployment & ops burden         | Gene Kim        |
| The Minimalist   | Simplicity & YAGNI              | Rob Pike        |

Each board member is a fully developed AI agent with its own philosophy,
analytical framework, and vigilance checklist. They are not thin wrappers
around a generic "be an expert" prompt. They are built to disagree with each
other, to surface what the others missed, and to give the Chairman something
worth synthesizing.

## How It Works

```
  You describe a complex task and say:
  "Call a board meeting" (or similar)
           │
           v
  ┌─────────────────────┐
  │   BOARD CHAIRMAN    │  <- Scores complexity. Reads all context.
  │   Pre-Flight        │     Drafts the Directives Report.
  │   (Phase 0)         │     Gets your approval before proceeding.
  └──────────┬──────────┘
             │  Approved
             v
  ┌─────────────────────┐
  │   CHAIRMAN SETUP    │  <- Creates board_meetings/BM_{task}_{datetime}/
  │   (Phase 0b)        │     Stores approved brief. Prepares session folders.
  └──────────┬──────────┘
             │  Begin meeting
             v
  ┌────────────────────────────────────────────────────────────────────┐
  │                     SESSION ONE  (Phase 1)                         │
  │                                                                    │
  │    All 10 board members run simultaneously as parallel agents.     │
  │    Each reads the brief. Each works independently.                 │
  │    Each writes their full analysis to their own dedicated file.    │
  │                                                                    │
  │   [ Architect ] [ Red Teamer ] [ Optimizer ] [ Advocate ]          │
  │   [ Contrarian ] [ Custodian ] [ Data Steward ] [ Chaos Agent ]    │
  │   [ Operator ] [ Minimalist ]                                      │
  └──────────┬─────────────────────────────────────────────────────────┘
             │  10 Session 1 reports complete
             v
  ┌────────────────────────────────────────────────────────────────────┐
  │                     SESSION TWO  (Phase 2)                         │
  │                                                                    │
  │    All 10 members run simultaneously again — with a key change.    │
  │    Each reads ALL 10 first-session reports before writing.         │
  │    They update, challenge, steelman, and refine their positions.   │
  │                                                                    │
  │    Positions held under scrutiny become reliable signals.          │
  │    Positions that shift reveal genuine insights.                   │
  └──────────┬─────────────────────────────────────────────────────────┘
             │  10 Session 2 reports complete
             v
  ┌─────────────────────┐
  │   BOARD CHAIRMAN    │  <- Reads all 20 reports.
  │   Final Synthesis   │     Maps convergences (strong signals).
  │   & Deliberation    │     Maps divergences (genuine uncertainty).
  │   (Phase 3)         │     Surfaces blind spots (what the board missed).
  └──────────┬──────────┘     Writes prioritized, justified recommendations.
             │
             v
  ┌─────────────────────┐
  │   CHAIRMAN HANDOFF  │  <- Executive Summary (5-7 sentences).
  │   (Phase 4)         │     Presents path to full meeting docs.
  └─────────────────────┘     Asks how you want to proceed.
```

The output is a complete Board Meeting Record — a structured folder of 22 files
that documents the full deliberation and delivers clear, prioritized,
evidence-backed recommendations.

## When to Call a Board Meeting

The Chairman automatically calls a meeting when a task scores **5/10 or higher on ANY** of these dimensions. You can also trigger one manually at any time.

| DIMENSION       | TRIGGERS AT 5/10 WHEN...                         |
| --------------- | ------------------------------------------------ |
| Scope           | Touches multiple modules, systems or data flows  |
| Ambiguity       | Requirements unclear or multi-interpretable      |
| Irreversibility | Hard or expensive to undo                        |
| Novelty         | Not an established pattern in this codebase      |
| Risk Surface    | Security, performance or data integrity at stake |
| Duration        | Estimated > 4 hours of implementation time       |

### You can also trigger a board meeting directly at any time:

Example Invocations:

> *"Call a board meeting"*

> *"I want the board's perspective before we proceed"*

> *"Run this through the board"*

**When in doubt, call the meeting.** The cost of 20 minutes of deliberation is
always lower than the cost of implementing the wrong solution.

---

## What You Get

A completed Board Meeting Record looks like this:

```
board_meetings/
└── BM_auth_refactor_20260401_143022/
    │
    ├── directives_report.md          <- The Chairman's brief, approved by you
    │
    ├── session_1/                    <- 10 independent first-pass analyses
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
    │
    ├── session_2/                    <- 10 refined analyses after cross-review
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
    │
    └── chairman_final_report.md      <- The synthesis: convergences, divergences,
                                         blind spots, prioritized recommendations,
                                         cautions, and closing statement
```

The **Chairman's Final Report** is the primary artefact. It is structured
across eight sections — from convergence mapping to implementation watchpoints
— and is designed to be readable as a standalone document by anyone who needs
to understand the decision and the reasoning behind it.

## Repository Structure

```
board-meeting-skill/
│
├── opencode/                           OpenCode
│   ├── skills/board-meeting/
│   │   ├── SKILL.md                    Skill entrypoint and full protocol
│   │   └── templates/                  4 structured report templates
│   └── agents/                         11 agent files (.md with YAML frontmatter)
│
├── claude-code/                        Claude Code
│   ├── commands/board-meeting.md       /board-meeting slash command
│   ├── agents/                         11 agent files (.md with YAML frontmatter)
│   └── templates/                      4 structured report templates
│
├── codex/                              OpenAI Codex
│   ├── skills/board-meeting/
│   │   ├── SKILL.md
│   │   └── templates/                  4 structured report templates
│   └── agents/                         11 agent files (.toml format)
│
├── cursor/                             Cursor
│   └── rules/
│       ├── board-meeting.mdc           Main skill rule
│       ├── board-meeting/templates/    4 structured report templates
│       └── board-members/              11 agent rules (.mdc format)
│
├── windsurf/                           Windsurf
│   └── rules/
│       ├── board-meeting.md            Main skill rule
│       ├── board-meeting/templates/    4 structured report templates
│       └── board-members/              11 agent rules (.md with trigger frontmatter)
│
├── docs/                               Manual Installation Instructions
│   ├── assets/                         Logo assets
│   ├── install-opencode.md
│   ├── install-claude-code.md
│   ├── install-codex.md
│   ├── install-cursor.md
│   └── install-windsurf.md
│
├── tests/                              Test suite
│   ├── README.md
│   └── suite.js
│
├── bin/
│   └── install.js                      Installation script
│
├── README.md                           (This File)
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── AUTHORS.md
├── CHANGELOG.md
├── LICENSE
└── package.json
```

## The Philosophy

This is not a prompt chain. It is not a "think step by step" wrapper. It is a
**deliberation protocol** — and the distinction matters.

Prompt chains decompose a task and pipeline it through sequential steps. They
are excellent at what they do, but they do not produce cognitive diversity.
Each step is still reasoning from the same direction as the one before it.

A deliberation protocol does something different. It takes a single problem and
runs it through *non-redundant cognitive toolkits simultaneously*. The
Architect's assessment is not downstream of the Red Teamer's — they work in
parallel, independently, from completely different starting points. The
convergences that emerge from that independence are robust in a way that no
single chain of thought can produce.

The Board Chairman is not a summarizer. Reading 20 independent reports and
producing a weighted synthesis that is *better than any individual report* is a
fundamentally different intellectual task than summarizing a conversation. The
Chairman is specifically designed for that task — shaped by Munger's latticework
of mental models and Shannon's instinct for finding the essential structure
beneath surface complexity.

**The goal is not more output. It is better decisions.**

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). New platform support and persona
refinements are particularly welcome.

## License

MIT — see [LICENSE](LICENSE).

<div align="center">

*Built on the intellectual frameworks of:*

*Munger · Fowler · Schneier · Knuth · Graham · Feynman · Cunningham · Hellerstein · Robbins · Kim · Pike*

</div>

<!-- Header Badge Icons -->
[sessions-badge-icon]: https://img.shields.io/badge/Sessions-2%20Rounds%20%2B%20Final%20Report-darkgreen?style=plastic&color=black
[board-members-badge-icon]: https://img.shields.io/badge/Board%20Members-10%20Specialists%20%2B%20Chairman-gold?style=plastic&color=black
[platforms-badge-icon]: https://img.shields.io/badge/Platforms-OpenCode%20%7C%20Claude%20Code%20%7C%20Codex%20%7C%20Cursor%20%7C%20Windsurf-blueviolet?style=plastic&color=black
[license-badge-icon]: https://img.shields.io/badge/License-MIT-blue.svg?logo=open-source-initiative&logoColor=white&style=plastic&color=black
[release-badge-icon]: https://img.shields.io/github/v/release/divisionseven/board-meeting-skill?style=plastic&color=black&logo=github&logoColor=white&label=Release
[build-badge-icon]: https://img.shields.io/github/actions/workflow/status/divisionseven/board-meeting-skill/ci.yml?branch=main&logo=github&style=plastic&color=black&logoColor=white&label=Build

<!-- Header Badge Links -->
[sessions-badge-link]: #how-it-works
[board-members-badge-link]: #the-board
[platforms-badge-link]: #quick-install
[license-badge-link]: LICENSE
[release-badge-link]: https://github.com/divisionseven/board-meeting-skill/releases
[build-badge-link]: https://github.com/divisionseven/board-meeting-skill/actions
[npm-package-link]: https://www.npmjs.com/package/board-meeting-skill
