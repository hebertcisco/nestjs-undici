module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
