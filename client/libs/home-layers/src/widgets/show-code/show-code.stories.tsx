import ShowCode from './show-code';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ShowCode> = {
    title: 'unknown/show-code',
    component: ShowCode,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ShowCode>;

export const Primary: Story = {
    args: {},
};
