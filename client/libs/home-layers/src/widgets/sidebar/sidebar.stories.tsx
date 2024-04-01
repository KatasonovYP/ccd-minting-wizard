import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from './sidebar';

const meta: Meta<typeof Sidebar> = {
    title: 'unknown/sidebar',
    component: Sidebar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
    args: {},
};
