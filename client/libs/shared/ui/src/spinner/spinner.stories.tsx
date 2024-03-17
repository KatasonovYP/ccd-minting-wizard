import { Spinner } from './spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
    title: 'unknown/spinner',
    component: Spinner,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
    args: {},
};
