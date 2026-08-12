# AGENTS.md

## Project

`readtime` is a small TypeScript library that estimates whole-minute reading
time for plain text and HTML fragments. Its public API is
`readtime(input: string): number`.

## Layout

- `src/index.ts`: library implementation
- `test/readtime.test.ts`: Vitest behavior tests
- `README.md`: public installation, usage, API, and limitation documentation
- `.github/workflows/`: CI and cross-version runnable-package checks

## Development

- Use npm and Node.js 18+; CI validates Node.js 18, 20, 22, and 24.
- Keep production code in TypeScript and follow `ts-standard` conventions.
- Preserve ESM import compatibility and the package's ESM, CommonJS, UMD, and
  declaration build outputs when changing the public API or packaging.
- Add or update focused Vitest coverage for behavior changes, including HTML
  parsing and Unicode word-segmentation cases where relevant.
- Update `README.md` whenever public behavior, supported input, limitations, or
  usage changes.

## Validation

Run checks proportional to the change. Before handoff, run the applicable
commands and run the full suite when practical:

```bash
npm run lint
npx tsc --noEmit
npm run test:coverage
npm run build
```

For packaging changes, also verify the built CommonJS, ESM, and UMD entry
points.

## Change discipline

- Preserve unrelated working-tree changes.
- Do not modify generated `dist/` or `coverage/` output; both are ignored.
- Avoid adding dependencies, changing package exports, or expanding the public
  API unless the task explicitly requires it.
- Report files changed and validation performed, including any checks not run.
