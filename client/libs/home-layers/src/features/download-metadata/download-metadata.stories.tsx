import { DownloadMetadata } from './download-metadata';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DownloadMetadata> = {
    title: 'unknown/download-metadata',
    component: DownloadMetadata,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DownloadMetadata>;

export const Primary: Story = {
    args: {},
};
