module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    // disabled because of a lot of issues https://github.com/typescript-eslint/typescript-eslint/issues/1824
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/prop-types': 'off',
    'max-len': ['warn', { code: 120, tabWidth: 2 }],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
