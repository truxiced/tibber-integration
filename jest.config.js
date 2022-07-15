const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/**/*.test.ts',
    // We only store exports in index files so these are usually not
    // targeted by unit tests
    '!./src/**/index.ts',
    // Main files bootstrap the app and makes very little sense
    // to test
    '!./src/**/main.ts',
    // Logging does a lot of context magic and is globally mocked
    '!./src/lib/infrastructure/logging',
  ],
};
