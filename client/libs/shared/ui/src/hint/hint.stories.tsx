import { Hint } from './hint';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Hint> = {
    title: 'unknown/hint',
    component: Hint,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Hint>;

export const Primary: Story = {
    args: {},
};
