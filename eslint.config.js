import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import d3Plugin from 'eslint-plugin-d3';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    plugins: {
      d3: d3Plugin,
      prettier: prettierPlugin,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },

  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'public/**'],
  },
];
