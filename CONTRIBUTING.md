# Contributing to agentlily-runtime

Thanks for helping shape the runtime foundation for Lily Protocol.

## Project Intent

This repository is intentionally scaffolded, not feature-complete. We want the
core runtime patterns to be clear enough that contributors can extend them in
small, reviewable increments.

Before opening a pull request:

- Check for an existing issue or open one first for larger changes
- Prefer extension points over deep, one-off implementations
- Keep public APIs typed and documented
- Add or update tests for behavior you change

## Local Development

```bash
npm install
npm run build
npm run test
npm run verify
```

## Suggested Contribution Areas

- New memory backends behind the existing interface
- Additional tool adapters and runtime policies
- Improved task coordination and observability
- Provider adapters for model integration
- Runtime safety checks and policy guards

## Pull Request Guidelines

- Keep PRs scoped to one concern
- Explain why the change belongs in the runtime foundation
- Document new extension points in the README or inline docs
- Avoid shipping completed subsystems where a scaffold is more appropriate

## Architecture Notes

- `src/runtime` contains runtime composition and bootstrap behavior
- `src/tasks` and `src/actions` drive the minimal happy-path execution
- `src/tools` defines the contributor-facing tool contract
- `src/memory`, `src/providers`, and `src/state` are deliberately thin
  abstractions for follow-up work

## Reporting Issues

Please include:

- Node.js version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Relevant logs or test output
