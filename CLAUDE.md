# eslint-config

My ESLint configuration!

## Project structure

```
eslint-config
├── src/
│   ├── index.js              # The config: one block per file type
│   └── index.test.js         # Tests that lint sample files with the config
│
└── .claude/
    └── hooks/lint-format.sh  # Lints and formats each written file
```

## Development

```sh
# Everything CI runs, in CI's order. Run before handing work back
pnpm check

pnpm format
pnpm lint      # Lints this repository with its own config
pnpm knip      # Find unused files, dependencies, and exports
pnpm test
```

## Testing

- Uses `vitest`
- Each test writes a sample file to a temporary project and asserts which rules
  the config reports on it. Add a test when adding a block for a file type,
  because `pnpm lint` only exercises the blocks this repository's own files
  match
