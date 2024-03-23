import { ErrorMessage } from './error-message';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ErrorMessage> = {
    title: 'unknown/error-message',
    component: ErrorMessage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Primary: Story = {
    args: {},
};
