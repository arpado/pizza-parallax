module.exports = {
  // preset: './jest-preset.js',
  moduleDirectories: ["node_modules", "src", ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$",
  // globalSetup: '<rootDir>/jest.setup.js',
  collectCoverageFrom: ['stores/**/*.js', 'server/**/*.js', 'composable/**/*.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "mjs", "vue"],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
}

// transform //
//     "^.+\\.vue$": "vue-jest",
// '^.+\\.vue$': 'vue3-jest',
//    '^.+\\js$': 'babel-jest',
