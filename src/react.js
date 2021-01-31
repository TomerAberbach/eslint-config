module.exports = {
  plugins: [`jsx-a11y`, `react`],
  rules: {
    'react/jsx-boolean-value': [`error`, `always`],
    'react/jsx-closing-bracket-location': [`error`, `line-aligned`],
    'react/jsx-closing-tag-location': `error`,
    'react/jsx-curly-newline': [`error`, `consistent`],
    'react/jsx-curly-spacing': `error`,
    'react/jsx-equals-spacing': `error`,
    'react/jsx-first-prop-new-line': [`error`, `multiline-multiprop`],
    'react/jsx-fragments': `error`,
    'react/jsx-indent': [
      `error`,
      2,
      { checkAttributes: true, indentLogicalExpressions: true }
    ],
    'react/jsx-indent-props': [`error`, 2],
    'react/jsx-no-comment-textnodes': `error`,
    'react/jsx-no-duplicate-props': `error`,
    'react/jsx-no-script-url': `error`,
    'react/jsx-no-target-blank': `error`,
    'react/jsx-no-undef': `error`,
    'react/jsx-no-useless-fragment': `error`,
    'react/jsx-one-expression-per-line': [`error`, { allow: `literal` }],
    'react/jsx-pascal-case': `error`,
    'react/jsx-tag-spacing': `error`,
    'react/jsx-uses-vars': `error`,
    'react/jsx-wrap-multilines': [
      `error`,
      {
        declaration: `parens-new-line`,
        assignment: `parens-new-line`,
        return: `parens-new-line`,
        arrow: `parens-new-line`,
        condition: `ignore`,
        logical: `ignore`,
        prop: `ignore`
      }
    ],
    'react/jsx-handler-names': `error`,
    'react/jsx-key': [`error`, { checkFragmentShorthand: true }],
    'react/jsx-no-bind': `error`,

    'jsx-a11y/accessible-emoji': `error`,
    'jsx-a11y/alt-text': `error`,
    'jsx-a11y/anchor-has-content': `error`,
    'jsx-a11y/anchor-is-valid': `error`,
    'jsx-a11y/aria-activedescendant-has-tabindex': `error`,
    'jsx-a11y/aria-props': `error`,
    'jsx-a11y/aria-proptypes': `error`,
    'jsx-a11y/aria-role': `error`,
    'jsx-a11y/aria-unsupported-elements': `error`,
    'jsx-a11y/autocomplete-valid': `error`,
    'jsx-a11y/click-events-have-key-events': `error`,
    'jsx-a11y/control-has-associated-label': [
      `off`,
      {
        ignoreElements: [
          `audio`,
          `canvas`,
          `embed`,
          `input`,
          `textarea`,
          `tr`,
          `video`
        ],
        ignoreRoles: [
          `grid`,
          `listbox`,
          `menu`,
          `menubar`,
          `radiogroup`,
          `row`,
          `tablist`,
          `toolbar`,
          `tree`,
          `treegrid`
        ],
        includeRoles: [`alert`, `dialog`]
      }
    ],
    'jsx-a11y/heading-has-content': `error`,
    'jsx-a11y/html-has-lang': `error`,
    'jsx-a11y/iframe-has-title': `error`,
    'jsx-a11y/img-redundant-alt': `error`,
    'jsx-a11y/interactive-supports-focus': [
      `error`,
      {
        tabbable: [
          `button`,
          `checkbox`,
          `link`,
          `progressbar`,
          `searchbox`,
          `slider`,
          `spinbutton`,
          `switch`,
          `textbox`
        ]
      }
    ],
    'jsx-a11y/label-has-associated-control': `error`,
    'jsx-a11y/media-has-caption': `error`,
    'jsx-a11y/mouse-events-have-key-events': `error`,
    'jsx-a11y/no-access-key': `error`,
    'jsx-a11y/no-autofocus': `error`,
    'jsx-a11y/no-distracting-elements': `error`,
    'jsx-a11y/no-interactive-element-to-noninteractive-role': `error`,
    'jsx-a11y/no-noninteractive-element-interactions': [
      `error`,
      {
        body: [`onError`, `onLoad`],
        iframe: [`onError`, `onLoad`],
        img: [`onError`, `onLoad`]
      }
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': `error`,
    'jsx-a11y/no-noninteractive-tabindex': `error`,
    'jsx-a11y/no-onchange': `error`,
    'jsx-a11y/no-redundant-roles': `error`,
    'jsx-a11y/no-static-element-interactions': `error`,
    'jsx-a11y/role-has-required-aria-props': `error`,
    'jsx-a11y/role-supports-aria-props': `error`,
    'jsx-a11y/scope': `error`,
    'jsx-a11y/tabindex-no-positive': `error`
  }
}
