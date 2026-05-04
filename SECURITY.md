# Security Policy

## Supported Versions

Only the **latest stable version** of the Board Meeting Skill is actively maintained and receives security updates.

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Public disclosure before a patch is available puts all Board Meeting Skill users at risk.
We ask that you follow responsible disclosure practices.

### Preferred Method: GitHub Private Security Advisory

Use GitHub's built-in private advisory system to report vulnerabilities confidentially:

👉 **[Report a vulnerability](https://github.com/divisionseven/board-meeting-skill/security/advisories/new)**

This creates a private, encrypted channel between you and the maintainer. You can include full technical details, proof-of-concept code, and suggested mitigations without any of it being publicly visible.

Please include as much detail as possible:

- A description of the vulnerability
- Steps to reproduce the issue
- Affected versions
- Any potential impact or exploit scenarios

## What to Expect

- We will acknowledge receipt of your report within 48 hours
- We will provide a detailed response within 7 days indicating the next steps
- We will work with you to understand and validate the issue
- We will coordinate disclosure with you to ensure a safe fix is deployed before public disclosure

## Security Best Practices

The Board Meeting Skill is designed to be safe by default:

- No network access is required
- No external dependencies are fetched at runtime
- All file operations are scoped to the project directory
- No code execution beyond the platform's built-in tools

However, when using this skill with any AI coding platform, follow these best practices:

1. **Review the output:** Always review the Board Meeting reports before implementing recommendations
2. **Understand the context:** The skill analyzes your codebase — ensure you understand what it's reading
3. **Limit access:** Only install the skill in projects you trust the AI platform to access
4. **Keep it updated:** Use the latest stable version to benefit from security improvements

## Security-Related Changes

Security-related changes will be:

- Clearly documented in the CHANGELOG.md
- Released as soon as possible after validation
- Backported to supported versions if applicable

Thank you for helping keep the Board Meeting Skill safe for everyone.
