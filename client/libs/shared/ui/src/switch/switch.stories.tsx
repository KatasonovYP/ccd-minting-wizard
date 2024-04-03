import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
    title: 'unknown/switch',
    component: Switch,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
    args: {},
};
