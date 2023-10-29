module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/(.*)': '<rootDir>/src/$1',
    },
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['ts', 'js'],
    testRegex: '__tests__/.*\\.test\\.ts?$',
    testEnvironmentOptions: {
        url: 'http://localhost',
    },
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
