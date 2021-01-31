# ESLint Config

[![NPM version](https://img.shields.io/npm/v/@tomer/eslint-config.svg)](https://www.npmjs.com/package/@tomer/eslint-config)

> My [ESLint](https://eslint.org) configuration!

## Install

```sh
$ npm i @tomer/eslint-config
```

## Usage

Configure ESLint to use `@tomer/eslint-config` by either extending the configuration in the [`"eslintConfig"` field](https://eslint.org/docs/developer-guide/shareable-configs#using-a-shareable-config) of your `package.json`:

**package.json**

```json
{
  "eslingConfig": {
    "extends": "@tomer"
  }
}
```

Or extending the configuration in your [`.eslintrc.*`](https://eslint.org/docs/user-guide/configuring#configuration-file-formats) file.

Run `eslint` with [the supported options](https://eslint.org/docs/user-guide/command-line-interface#options).

Note that this configuration is intended to be used with [`@tomer/prettier-config`](https://github.com/TomerAberbach/prettier-config).

## License

[MIT](https://github.com/TomerAberbach/eslint-config/blob/main/license) © [Tomer Aberbach](https://github.com/TomerAberbach)
