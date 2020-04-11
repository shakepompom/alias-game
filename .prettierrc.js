module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: './src/**/*.ts, ./src/**/*.tsx',
      options: {
        trailingComma: 'all',
      },
    },
  ],
};
