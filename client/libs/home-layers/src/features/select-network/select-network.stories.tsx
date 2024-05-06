import { SelectNetwork } from './select-network';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SelectNetwork> = {
    title: 'unknown/select-network',
    component: SelectNetwork,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectNetwork>;

export const Primary: Story = {
    args: {},
};
