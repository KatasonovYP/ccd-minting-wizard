import { DropdownMenu } from './dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof DropdownMenu> = {
    title: 'unknown/dropdown-menu',
    component: DropdownMenu,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Primary: Story = {
    args: {},
};
