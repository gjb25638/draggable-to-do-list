const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    APP_CONFIG: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'error',
    'no-tabs': 0,
    'vue/require-explicit-emits': 0,
    'vue/require-prop-types': 0,
    'vue/v-on-event-hyphenation': 0,
    'no-mixed-spaces-and-tabs': 0,
    'vue/no-unused-components': 0,
    'vue/multi-word-component-names': 0,
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-trailing-spaces': 2,
    'quote-props': ['error', 'as-needed'],
    indent: ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': 2,
  }
})
