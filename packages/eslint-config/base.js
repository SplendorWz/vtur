import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'

/**
 * 多项目仓库基础ESLint配置
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  // 全局配置：指定生效文件和环境
  {
    files: ['**/*.{js,ts,vue}'], // 对 JS/TS/Vue 文件生效
    ignores: ['node_modules/', 'dist/', '*.d.ts'], // 忽略无需校验的文件
    languageOptions: {
      globals: {
        // 浏览器环境全局变量
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        // Node.js 环境全局变量
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      ecmaVersion: 2024, // 支持 ES2024 语法
      sourceType: 'module', // 模块模式（支持 import/export）
    },
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**'],
  },
]
