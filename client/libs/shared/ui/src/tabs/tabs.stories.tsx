import { Tabs } from './tabs';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Tabs> = {
    title: 'unknown/tabs',
    component: Tabs,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
    args: {},
};
