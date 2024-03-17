import type { StorybookConfig } from '@storybook/react-vite';

export default {
    stories: ['../../../libs/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-dark-mode',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: { builder: { viteConfigPath: 'apps/home/vite.config.mts' } },
    },
} satisfies StorybookConfig;
