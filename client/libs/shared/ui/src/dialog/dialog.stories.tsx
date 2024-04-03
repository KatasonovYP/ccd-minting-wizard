import type { Meta, StoryObj } from '@storybook/react';

import { Dialog } from './dialog';

const meta: Meta<typeof Dialog> = {
    title: 'unknown/dialog',
    component: Dialog,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
    args: {},
};
