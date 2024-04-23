import { ScrollArea } from './scroll-area';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ScrollArea> = {
    title: 'unknown/scroll-area',
    component: ScrollArea,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Primary: Story = {
    args: {},
};
