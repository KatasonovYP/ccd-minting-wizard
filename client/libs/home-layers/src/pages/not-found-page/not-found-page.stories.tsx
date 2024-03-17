import { NotFoundPage } from './not-found-page';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof NotFoundPage> = {
    title: 'unknown/not-found-page',
    component: NotFoundPage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Primary: Story = {
    args: {},
};
