// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please see the guide for more information: https://stryker-mutator.io/docs/stryker-js/guides/angular",
  mutate: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/test.ts', '!src/environments/*.ts'],
  testRunner: 'karma',
  karma: {
    configFile: 'karma.conf.js',
    projectType: 'angular-cli',
    config: {
      browsers: ['ChromeHeadless']
    }
  },
  plugins: [
    "@stryker-mutator/karma-runner"
  ],
  reporters: ['progress', 'clear-text', 'html'],
  concurrency: 5,
  concurrency_comment: 'Recommended to use about half of your available cores when running stryker with angular',
  coverageAnalysis: 'perTest'
};
export default config;
