import { Background } from './background';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Background> = {
    title: 'shared/background',
    component: Background,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Background>;

export const Primary: Story = {
    args: { type: 'landing' },
};
