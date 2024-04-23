import { Sidebar } from './sidebar';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Sidebar> = {
    title: 'unknown/sidebar',
    component: Sidebar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
    args: {},
};
