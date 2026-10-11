import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: `node`,
    globalSetup: [`src/global-setup.ts`],
    coverage: {
      include: [`src`],
    },
  },
})
