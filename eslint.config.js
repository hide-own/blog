// eslint.config.js
import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    js.configs.recommended,
    ...vuePlugin.configs['flat/recommended'],  // 使用 flat 配置而不是旧的配置
    {
        // 仅对 JS 文件应用基本的 JavaScript 规则
        files: ['**/*.js', '**/*.cjs'],
        languageOptions: {
            globals: {
                ...js.configs.recommended.globals,
                module: 'readonly',
                require: 'readonly',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },
    {
        // 仅对 TS 文件应用 TypeScript 解析器和规则
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                // 禁用项目服务，避免路径问题
                projectService: false,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            // 重写需要自定义的规则
            '@typescript-eslint/ban-ts-comment': [
                'error',
                { 'ts-ignore': 'allow-with-description' },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-function': [
                'error',
                { allow: ['arrowFunctions'] },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            'no-undef': 'off', // TypeScript 项目中禁用 no-undef，因为 TS 编译器会处理类型检查
        },
    },
    {
        // 对 TypeScript 类型定义文件的特殊配置
        files: ['**/*.d.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                // 禁用项目服务，避免路径问题
                projectService: false,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            // 特殊处理类型定义文件
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',

        },
    },
    {
        // 对 Vue 文件的特殊配置
        files: ['**/*.vue'],
        languageOptions: {
            parser: vuePlugin.parse,  // 使用 Vue 插件的解析器
            parserOptions: {
                parser: tsParser,  // 在 Vue 文件中使用 TypeScript 解析器解析脚本部分
                ecmaVersion: 'latest',
                sourceType: 'module',
                // 禁用项目服务，避免路径问题
                projectService: false,
                extraFileExtensions: ['.vue'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            // 重写需要自定义的规则
            '@typescript-eslint/ban-ts-comment': [
                'error',
                { 'ts-ignore': 'allow-with-description' },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-function': [
                'error',
                { allow: ['arrowFunctions'] },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            'vue/require-default-prop': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/valid-template-root': 'off',
            'no-undef': 'off', // TypeScript 项目中禁用 no-undef，因为 TS 编译器会处理类型检查
        },
    },
    {
        files: ['*.js'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },
];