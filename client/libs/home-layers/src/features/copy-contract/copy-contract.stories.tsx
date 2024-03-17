import { CopyContract } from './copy-contract';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof CopyContract> = {
    title: 'unknown/copy-contract',
    component: CopyContract,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CopyContract>;

export const Primary: Story = {
    args: {},
};
