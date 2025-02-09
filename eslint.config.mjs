import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // 添加 Prettier 规则
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      ...prettierConfig.rules, // 兼容 Prettier
      'prettier/prettier': 'warn', // 显示 Prettier 格式化建议
    },
  },
  // ts any爆红处理
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
