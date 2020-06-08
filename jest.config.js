module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?x?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?x?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'tsx'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: [
    "raf/polyfill",
    "<rootDir>/src/tests/setupTests.tsx"
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ]
}