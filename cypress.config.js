const { defineConfig } = require('cypress')

const time = 50_000

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: time,
  responseTimeout: time,
  execTimeout: time,
  taskTimeout: time,
  requestTimeout: time,
  pageLoadTimeout: time,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
