import { themes } from '@storybook/theming';
import { StyleDecorator } from '../decorators/style-decorator';
import { RouterDecorator } from '../decorators/router-decorator';
import { customViewports } from './custom-viewports';
import type { Preview } from '@storybook/react';
import '@/shared/config/i18n';
import '@/shared/css';
import './styles.css';

export default {
    decorators: [StyleDecorator, RouterDecorator],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        docs: { theme: themes.dark },
        backgrounds: {
            default: 'dark',
            values: [
                {
                    name: 'dark',
                    value: '#1B1C1D',
                },
                {
                    name: 'light',
                    value: '#FFFFFF',
                },
            ],
        },
        viewport: { viewports: customViewports },
    },
    globalTypes: {
        darkMode: { defaultValue: true }, // Enable dark mode by default on all stories
        className: { defaultValue: 'dark' }, // Set your custom dark mode class name
    },
} satisfies Preview;
