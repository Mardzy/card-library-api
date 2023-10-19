import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>'
    }),
    preset: 'ts-jest',
    resetMocks: true,
    restoreMocks: true,
    rootDir: '.',
    roots: ['./tests'],
    testMatch: [
        '**/?(*.)+(spec).ts'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        './src/entities/*',
        './src/migrations/*'
    ]
};
export default config;
//# sourceMappingURL=jest.config.js.map