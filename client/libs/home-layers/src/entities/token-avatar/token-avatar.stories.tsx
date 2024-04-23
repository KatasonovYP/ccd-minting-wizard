import { TokenAvatar } from './token-avatar';
import type { Meta, StoryObj } from '@storybook/react';

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
