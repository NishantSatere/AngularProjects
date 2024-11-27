module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'], // Include the tests folder here
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforms TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // File extensions Jest should handle
  testMatch: ['**/*.test.ts', '**/*.spec.ts'], // Test files naming pattern
  collectCoverage: true, // Enable coverage report
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'], // Files for coverage report
  testPathIgnorePatterns: ['/node_modules/'],
};
