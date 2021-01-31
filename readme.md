<h1 align="center">
  eslint-config
</h1>

<div align="center">
  <a href="https://npmjs.org/package/eslint-config">
    <img src="https://badgen.now.sh/npm/v/eslint-config" alt="version" />
  </a>
  <a href="https://github.com/TomerAberbach/eslint-config/actions">
    <img src="https://github.com/TomerAberbach/eslint-config/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="https://packagephobia.now.sh/result?p=eslint-config">
    <img src="https://packagephobia.now.sh/badge?p=eslint-config" alt="install size" />
  </a>
</div>

<div align="center">
  My ESLint configuration!
</div>

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

## Contributing

Stars are always welcome!

For bugs and feature requests, [please create an issue](https://github.com/TomerAberbach/eslint-config/issues/new).

## License

[MIT](https://github.com/TomerAberbach/eslint-config/blob/main/license) © [Tomer Aberbach](https://github.com/TomerAberbach)
