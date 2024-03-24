import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
    title: 'unknown/avatar',
    component: Avatar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
    args: {},
};
