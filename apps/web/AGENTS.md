# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Active product decisions

- Visual source of truth: Product Design ideation Option 2, the light “数据探索器” desktop workbench.
- The first release is a local, single-user app focused on destination/keyword lookup and hotel list/detail queries.
- Storage is memory-only: no SQLite, no WASM database, no query history, and no persisted raw responses.
- Default upstream environment is CtripBiz production; credentials must remain server-side and diagnostics must be redacted.
- No map, account system, public API, flight search, or AI chat in the first release.
- Use a grouped search surface, compact table results, a common/advanced filter split, and a bottom diagnostics dock.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
