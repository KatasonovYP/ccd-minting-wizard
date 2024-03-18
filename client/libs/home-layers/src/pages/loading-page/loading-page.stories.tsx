import { LoadingPage } from './loading-page';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoadingPage> = {
    title: 'unknown/loading-page',
    component: LoadingPage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingPage>;

export const Primary: Story = {
    args: {},
};
