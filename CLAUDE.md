# eslint-config

My ESLint configuration!

## Project structure

```
eslint-config
├── src/
│   ├── index.ts              # The config: one block per file type
│   ├── index.test.ts         # Tests that lint sample files with the config
│   ├── package.test.ts       # Lints and typechecks with the packed package installed in a fresh project
│   ├── react.test.ts         # React version detection, which needs its own test file
│   ├── lint-file.ts          # Lints a file in a temporary project
│   └── global-setup.ts       # Rebuilds dist/ before every test run and watch rerun
│
└── .claude/
    └── hooks/lint-format.sh  # Lints and formats each written file
```

## Development

```sh
# Everything CI runs. Run before handing work back
pnpm check

pnpm format
pnpm lint      # Lints this repository with its own config, loaded from src/index.ts
pnpm typecheck
pnpm knip      # Find unused files, dependencies, and exports
pnpm test
pnpm coverage
pnpm build     # Bundle with tsdown
```

## Config

- Keep `src/index.ts` runnable by Node.js directly, because `eslint.config.js`
  imports it without a build
- The published types contain only ESLint's own config type. Don't export a
  plugin's types, because `eslint` is the only dependency consumers install
  themselves

## Testing

- Uses `vitest`
- Each test in `index.test.ts` writes a sample file to a temporary project and
  asserts which rules the config reports on it. Add a test when adding a block
  for a file type, because `pnpm lint` only exercises the blocks this
  repository's own files match
