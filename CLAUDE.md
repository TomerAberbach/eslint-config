# eslint-config

My ESLint configuration!

## Project structure

```
eslint-config
├── src/
│   ├── index.ts              # The config: one block per file type
│   ├── package.test.ts       # Builds, packs, and installs the package in a fresh project, then lints and typechecks with it
│   └── testing.ts            # Test helpers: temporary projects and linting a file in one
│
└── .claude/
    └── hooks/lint-format.sh  # Lints and formats each written file
```

## Development

Run `pnpm check`, which is what CI runs, before handing work back.

## Config

- Keep `src/index.ts` runnable by Node.js directly, because `eslint.config.js`
  imports it without a build
- The published types contain only ESLint's own config type. Don't export a
  plugin's types, because `eslint` is the only dependency consumers install
  themselves
- A change that makes the config report errors on code it accepted before is
  breaking. Mark its commit with `!`, as in `feat!:`

## Testing

- Each test in `index.test.ts` writes a sample file to a temporary project and
  asserts which rules the config reports on it. Add a test when adding a block
  for a file type, because `pnpm lint` only exercises the blocks this
  repository's own files match

## Dependencies

- Keep `typescript` on 6 until typescript-eslint supports 7
  (typescript-eslint#10940)
- Keep `@types/node` on the major of the minimum Node.js version in `engines`
- pnpm hides versions younger than its minimum release age from `pnpm outdated`
  and rejects them in a frozen install. Installing one explicitly adds it to
  `minimumReleaseAgeExclude` in `pnpm-workspace.yaml`. Keep that entry until the
  version passes the cutoff
