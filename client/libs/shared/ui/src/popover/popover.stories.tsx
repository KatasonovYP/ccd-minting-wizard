import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from './popover';

const meta: Meta<typeof Popover> = {
    title: 'unknown/popover',
    component: Popover,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Primary: Story = {
    args: {},
};
