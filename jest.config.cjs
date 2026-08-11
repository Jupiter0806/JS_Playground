module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["**/?(*.)+(spec|test).[tj]s"],
  testPathIgnorePatterns: ["/node_modules/", "/my_node_modules/"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
};
