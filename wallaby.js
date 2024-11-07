
module.exports = () => ({
  autoDetect: false,
  files: ['vite.config.mts', 'src/**/*.ts', '!src/**/*.spec.ts'],
  tests: ['src/**/*.spec.ts'],
  testFramework: {
    configFile: './vite.config.mts'
  }
});
