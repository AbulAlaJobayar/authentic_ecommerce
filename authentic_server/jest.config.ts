// const { createDefaultPreset } = require('ts-jest');

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// module.exports = {
//   testEnvironment: 'node',
//   transform: {
//     ...tsJestTransformCfg,
//   },
//   forceExit: true,
// };
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testMatch: ['**/__tests__/**/*.ts'], // or .tsx if using React
//   forceExit: true,
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
// };
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
   forceExit: true,
};