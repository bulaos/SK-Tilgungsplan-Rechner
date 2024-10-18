import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Make sure this is correctly specified
  testEnvironment: "node", // Use 'jsdom' if you're testing browser environments
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform TypeScript files
  },
};

export default config;
