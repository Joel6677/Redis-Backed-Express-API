import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Enable ts-jest for TypeScript testing
  testEnvironment: 'node', // Set the test environment to Node.js
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for transforming ts and tsx files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.tsx'], // Match test files
  verbose: true, // Show verbose test results
  globals: {
    'ts-jest': {
      isolatedModules: true, // Use isolated modules to speed up the tests
    },
  },
};

export default config;



