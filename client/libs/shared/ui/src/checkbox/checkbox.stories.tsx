import { Checkbox } from './checkbox';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Checkbox> = {
    title: 'shared/checkbox',
    component: Checkbox,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
    args: { label: 'click me' },
    parameters: {
        backgrounds: { default: 'light' },
    },
};
