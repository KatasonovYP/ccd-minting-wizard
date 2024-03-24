import type { Meta, StoryObj } from '@storybook/react';

import { TokenAvatar } from './token-avatar';

const meta: Meta<typeof TokenAvatar> = {
    title: 'unknown/token-avatar',
    component: TokenAvatar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TokenAvatar>;

export const Primary: Story = {
    args: {},
};
