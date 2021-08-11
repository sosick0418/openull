module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        tabWidth: 2,
        useTabs: false,
        printWidth: 80,
      },
    ],
  },
};
