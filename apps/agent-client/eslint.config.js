import { vueJsConfig } from '@repo/eslint-config/vue-js'

export default [
  ...vueJsConfig,
  {
    // 项目特定覆盖规则
    rules: {
      // 在这里可以覆盖共享配置中的规则
      // 'no-console': 'off',
    },
  },
]
