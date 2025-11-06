import { globalIgnores } from 'eslint/config'
import { config as baseConfig } from './base.js'
import vue from 'eslint-plugin-vue' // Vue 相关规则
import vueParser from 'vue-eslint-parser' // Vue SFC 解析器
import tseslint from 'typescript-eslint'

/**
 * Vue.js ESLint配置
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const vueJsConfig = [
  ...baseConfig,
  globalIgnores(['dist/**', 'build/**', '*.d.ts', '**/*.d.ts']),
  // Vue3 推荐规则（分阶段启用）
  ...vue.configs['flat/essential'], // 基础必需规则（如防止语法错误）
  ...vue.configs['flat/strongly-recommended'], // 强推荐规则（如组件命名规范）
  ...vue.configs['flat/recommended'], // 推荐规则（如属性排序）
  // Vue + TypeScript 特殊配置（针对 SFC 中的 TS 代码）
  {
    files: ['**/*.vue'], // 仅对 Vue 文件生效
    languageOptions: {
      parser: vueParser, // 用 vue-eslint-parser 解析 Vue SFC
      parserOptions: {
        parser: tseslint.parser, // Vue 中 <script> 标签内的 TS 代码用 TS 解析器
        sourceType: 'module', // 模块模式（支持 import/export）
        ecmaVersion: 'latest', // 支持最新 ES 语法
        vueFeatures: {
          scriptSetup: true, // 支持 <script setup> 语法
          compositionApi: true, // 支持组合式 API
        },
      },
    },
    rules: {
      // Vue3 特殊规则（按需调整）
      // "vue/script-setup-uses-vars": "error", // 确保 <script setup> 中变量被使用
      'vue/no-multiple-template-root': 'off', // Vue3 支持多根节点，关闭该规则
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // 单标签自动闭合（如 <img/>）
            normal: 'always', // 双标签自闭合（如 <Component/>）
            component: 'always',
          },
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 4,
          },
          multiline: {
            max: 1,
          },
        },
      ],
    },
  },
  // TypeScript 自定义规则（覆盖默认配置）
  {
    files: ['**/*.ts', '**/*.vue'], // 对 TS 和 Vue 中的 TS 代码生效
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略下划线开头的未使用参数（如 (_, res) => {}）
          varsIgnorePattern: '^_', // 忽略下划线开头的未使用变量
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 允许函数返回值隐式类型（Vue3 setup 常用）
      '@typescript-eslint/no-explicit-any': 'warn', // any 类型警告（而非报错）
    },
  },
]
