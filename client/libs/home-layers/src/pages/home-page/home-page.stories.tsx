import { HomePage } from './home-page';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof HomePage> = {
    title: 'unknown/home-page',
    component: HomePage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Primary: Story = {
    args: {},
};
