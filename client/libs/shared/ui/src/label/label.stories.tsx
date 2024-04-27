import { Label } from './label';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
    title: 'unknown/label',
    component: Label,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Primary: Story = {
    args: {},
};
