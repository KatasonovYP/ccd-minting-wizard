import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './select';

const meta: Meta<typeof Select> = {
    title: 'unknown/select',
    component: Select,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
    args: {},
};
