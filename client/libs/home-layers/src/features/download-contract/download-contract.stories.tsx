import { DownloadContract } from './download-contract';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DownloadContract> = {
    title: 'unknown/download-contract',
    component: DownloadContract,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DownloadContract>;

export const Primary: Story = {
    args: {},
};
