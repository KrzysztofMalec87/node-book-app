module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint', 'eslint-comments', 'prettier'],
    ignorePatterns: ['*.d.ts'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts'],
            },
        },
    },
    rules: {
        'prettier/prettier': 'error',
        'eslint-comments/no-aggregating-enable': 2,
        'eslint-comments/no-unlimited-disable': 2,
        'eslint-comments/no-unused-disable': 2,
        'eslint-comments/no-unused-enable': 2,
        'eslint-comments/no-duplicate-disable': 2,
        'eslint-comments/disable-enable-pair': 2,
        'no-use-before-define': 0,
        'consistent-return': 0,
        'no-underscore-dangle': 0,
        '@typescript-eslint/no-use-before-define': 2,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': 2,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        'no-redeclare': 0,
        '@typescript-eslint/no-redeclare': 2,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/prefer-optional-chain': 2,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 2,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': [
            2,
            {
                devDependencies: [
                    '**/*.test.**',
                    '**/*.test-utils.**',
                    '**/*.spec.**',
                    '**/*.stories.**',
                    '**/webpack.**',
                    'jest-setup.ts',
                ],
            },
        ],
        'no-implicit-coercion': ['error', { boolean: true, number: false, string: false }],
        'no-console': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message:
                    'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            },
            {
                selector: 'LabeledStatement',
                message:
                    'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message:
                    '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        'func-names': 0,
        'no-alert': 2,
        'default-param-last': 0,
        '@typescript-eslint/default-param-last': 2,
    },
    overrides: [
        {
            files: ['**/*.ts'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 0,
                '@typescript-eslint/no-non-null-assertion': 2,
                camelcase: 0,
            },
        },
    ],
};
