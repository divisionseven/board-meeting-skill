# Contributing to the Board Meeting Skill

First — thank you. This project exists because the tools available to AI
coding assistants were not good enough. If you are here, you probably feel
the same way.

This document explains how the project is organized, what kinds of contributions
are most valuable, and how to make one cleanly and efficiently.

---

## Understanding the Architecture

Before contributing, it is worth understanding the one rule that keeps this
repository coherent:

> **Content is owned by `opencode/`. Format is owned by each platform.**

The persona instructions, templates, and protocol logic in `opencode/` are the
canonical source of truth. Every other platform directory is an adaptation of
that source into the formats and conventions that platform requires. The words
stay the same. The packaging changes.

This means: if you improve a persona, you improve it in `opencode/` first and
then propagate the change to every other platform. If you fix a Cursor-specific
frontmatter issue, only `cursor/` needs to change.

Keep this distinction sharp and the project stays maintainable. Let it blur and
it becomes a nightmare.

---

## Platform Directory Structures

Each platform has its own conventions for where custom agents, rules, and skills
live. The directory structures in this repository reflect those conventions:

| Platform | Directory Structure | Format | Notes |
|----------|---------------------|--------|-------|
| **OpenCode** | `skills/` + `agents/` | `.md` with YAML frontmatter | Skills and agents are separate |
| **Claude Code** | `commands/` + `agents/` + `templates/` | `.md` with YAML frontmatter | Includes slash command definition |
| **Codex** | `skills/` + `agents/` | `.toml` for agents, `.md` for skills | TOML format for agent definitions |
| **Cursor** | `rules/` with subdirectories | `.mdc` format | All rules in a single directory tree |
| **Windsurf** | `rules/` with subdirectories | `.md` with trigger frontmatter | Similar to Cursor but different format |

These differences are intentional — they follow each platform's idiomatic patterns.
When adding a new platform, study its documentation and adopt its conventions
rather than forcing a uniform structure.

---

## The Highest-Value Contributions

### New Platform Support

The AI coding platform landscape is moving quickly. If a major platform is not
supported, adding it is among the most impactful contributions you can make.

Before opening a PR for a new platform:

1. Read the platform's documentation on custom agents, rules, or skills until
   you understand how it works — not just the surface syntax, but the mental
   model the platform uses for context injection, agent dispatch, and tool
   permissions.
2. Look at two or three existing platform directories to understand the
   pattern. The goal is a clean, idiomatic adaptation — not a direct copy with
   a different file extension.
3. The platform should support: custom agent personas, parallel subagent
   execution, and file read/write access. If it supports only one or two of
   these, document the limitation clearly.
4. Open an issue before building, so we can discuss the approach before you
   invest the work.

### Persona Refinements

Each board member persona is grounded in the documented intellectual framework
of a real person. If a persona is inaccurate to its inspiration, or if its
vigilance checklist misses something important, improvements are welcome.

What makes a good persona PR:

- **Specificity.** The board members should not give generic advice that any
  competent engineer would give. They should give advice that *this specific
  lens* would uniquely surface. If The Contrarian is saying things The
  Optimizer would also say, the Contrarian needs sharpening.
- **Evidence.** If you are changing The Architect's philosophy section, you
  should be able to cite the specific Fowler work or documented pattern that
  your change reflects.
- **The vigilance checklist.** This is often the most practically valuable part
  of each persona. If you have found a class of problem that a persona should
  be catching but isn't, adding it to the checklist is high-value.

### Template Improvements

The four report templates define the structure of every board meeting output.
They are designed to be filled out by an AI agent, so they need to be both
comprehensive enough to capture what matters and tight enough that the agent
does not get lost. If you find sections that are redundant, missing, or poorly
specified — especially sections that cause agents to produce weak output in
practice — improvements are welcome.

### Bug Reports and Protocol Issues

If something in the protocol is logically inconsistent — an agent instruction
that contradicts SKILL.md, a file path reference that does not match the folder
structure, a phase boundary that is ambiguous — please open an issue.

Include: the platform, the specific file, and a precise description of the
inconsistency. The cleaner the bug report, the faster it gets fixed.

---

## What We Are Not Looking For

**Simplification.** The board has 10 members because 10 non-redundant lenses
is how you cover the space. Proposals to reduce it to 5 "more important"
members miss the point: importance is domain-specific. The member that looks
redundant on your project is essential on someone else's.

**LLM-specific prompt hacks.** The skill is designed to be provider-agnostic
and durable across model updates. Contributions that only work on a specific
model version or that rely on undocumented model behavior will not be merged.

**Weakening the research foundation.** The three-body research justification
(Page, Bourke, ARB practice) is not flavour text — it is the intellectual
basis for the design decisions in the protocol. Do not remove or replace it.

**Adding opinionated tooling.** This repository contains instructions and
templates. It does not contain shell scripts, Python wrappers, or any other
runtime tooling. Keep it that way.

---

## How to Contribute

```
1.  Fork the repository

2.  Create a branch
    git checkout -b your-branch-name

3.  Make your changes
    - Content change? Start in opencode/, then propagate to all platforms
    - Format/platform-specific change? Only touch the affected platform dir
    - New platform? Follow the pattern of the closest existing platform

4.  Keep the content consistent across platforms
    The persona instructions and template content must be identical across all
    platform adaptations. Only frontmatter, file format, and folder structure
    should differ.

5.  Test your changes
    Run a board meeting using your modified files and verify that the Chairman
    correctly orchestrates all four phases and that the output folder is
    complete and correct.

6.  Open a pull request
    - Title: clear and specific ("Add Windsurf support" not "Update files")
    - Body: what changed, why, and how you tested it
    - Link to any relevant issue
```

---

## Opening Issues

**Bug reports** should include: the platform, the file, the step in the
protocol where the issue occurred, and what the agent did versus what was
expected.

**Feature requests** should describe the use case, not just the feature.
"I want X" is less useful than "When I try to do Y, the current setup does Z,
which makes it impossible to W."

**Platform requests** should name the platform, link to its documentation on
custom agents or rules, and explain how its system differs from the existing
platforms. A one-paragraph technical comparison is more useful than a request
alone.

---

## A Note on Quality

The board members are named after people who set high standards for intellectual
rigour in their domains. The contributions to this project should reflect the
same standard.

Not every PR needs to be a major contribution. A small, precise improvement to
one vigilance checklist item — specific, justified, well-articulated — is more
valuable than a large, unfocused rewrite. Quality over volume.

---

## License

By contributing, you agree that your contributions will be licensed under the
MIT License that covers this project.
