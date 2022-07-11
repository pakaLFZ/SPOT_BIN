module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-redux/recommended',
    'plugin:json/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-redux',
    'json',
    'jsx-a11y',
    'react-hooks',
    'import'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/jsx-filename-extension': 2,
    'react/prop-types': 1,
    'import/no-unresolved': 0 // not until we find how to resolve webpack alias
  }
}
