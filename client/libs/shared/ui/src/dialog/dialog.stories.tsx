import { Dialog } from './dialog';
import type { Meta, StoryObj } from '@storybook/react';


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
