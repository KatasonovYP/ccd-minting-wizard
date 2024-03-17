import { Input } from './input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
    title: 'unknown/input',
    component: Input,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {},
};
