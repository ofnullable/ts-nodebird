module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
  globals: {
    React: 'writable',
  },
};
