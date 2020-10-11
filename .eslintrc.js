module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: ['plugin:react/recommended'],

  settings: {
    react: {
      version: 'detect',
    },
  },

  overrides: [
    {
      files: ['*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-comment': [
          2,
          {
            'ts-ignore': 'allow-with-description',
          },
        ],
      },
    },
    {
      files: ['src/**/*.test.{ts,tsx,js,jsx}', 'setupTests.{ts,tsx,js,jsx}'],
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended'],
    },
  ],

  rules: {
    semi: 'error',
  },
};
