import { DeployContract } from './deploy-contract';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeployContract> = {
    title: 'unknown/deploy-contract',
    component: DeployContract,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeployContract>;

export const Primary: Story = {
    args: {},
};
