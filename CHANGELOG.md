# Changelog

All notable changes to the Board Meeting Skill will be documented here.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## Added

- Add file backup generation to `install.js` with conflict preview for additional overwrite protection

## Changed

- Change README links to use an alias tree
- Connect README badges to doc bookmarks
- Replace ASCII tables with markdown tables on README for dynamic scaling on mobile

## [1.0.1] — 2026-05-03

### Changed

- Connect npm publishing to release action

## [1.0.0] — 2026-05-03

### Initial public release.

**The Board**
- Board Chairman (Charlie Munger) — full orchestration and synthesis role,
  owning all four phases from pre-flight through handoff
- 10 board members, each with complete persona instructions, analytical
  framework, vigilance checklist, and per-session file directives:
  The Architect, The Red Teamer, The Optimizer, The Advocate, The Contrarian,
  The Custodian, The Data Steward, The Chaos Agent, The Operator,
  The Minimalist

**The Protocol**
- Phase 0: Chairman pre-flight — complexity scoring, context gathering,
  Directives Report drafting, user approval gate
- Phase 0b: Chairman folder setup — creates full `board_meetings/BM_*/`
  structure before dispatching any board members
- Phase 1: Session One — all 10 members run in parallel, independent analysis
- Phase 2: Session Two — all 10 members re-run after reading all Session 1
  reports, positions updated, convergences and divergences emerge
- Phase 3: Chairman synthesis — reads all 20 reports, maps convergences,
  divergences, and blind spots, writes prioritized recommendations
- Phase 4: Chairman handoff — Executive Summary and next-step prompt

**The Templates**
- `01-directives-report.md` — 9-section structured brief for the Chairman
- `02-first-session.md` — 8-section independent analysis template for
  board members
- `03-second-session.md` — 7-section cross-review and position refinement
  template for board members
- `04-chairman-synthesis.md` — 8-section full synthesis template for the
  Chairman including convergence maps, divergence assessments, blind spots,
  and recommendations with a Quick Reference Card appendix

**Platform Support**
- OpenCode — `SKILL.md` with YAML frontmatter, `agents/*.md` with full
  OpenCode tool permission blocks, templates in `skills/board-meeting/templates/`
- Claude Code — `/board-meeting` slash command in `commands/`, agents in
  `agents/` with Claude Code frontmatter, templates in `templates/`
- OpenAI Codex — `SKILL.md` skill entrypoint, agent instructions in `.toml`
  format with `[agent]` and `[instructions]` sections
- Cursor — main rule in `board-meeting.mdc` with `alwaysApply: false`,
  board member rules in `board-members/*.mdc`, templates in
  `board-meeting/templates/`
- Windsurf — main rule in `board-meeting.md` with `trigger: model_decision`,
  board member rules in `board-members/*.md`

**Installer**
- `npx board-meeting-skill` CLI installer — interactive prompts for platform
  selection (OpenCode, Claude Code, Codex, Cursor, Windsurf) and scope
  (project or global), copies the correct files to the correct locations,
  prints a verification and next-steps summary on completion
- `package.json` with `bin` field wired to `bin/install.js` for direct `npx`
  execution without a global install step

**Documentation**
- Platform-specific installation guides for all five platforms
- `CONTRIBUTING.md` with the content/format distinction, contribution
  guidelines, and quality standard
- `CHANGELOG.md` (this file)
- MIT License

---

*For planned improvements and known issues, see the repository's Issues tab.*
