import { ResultPage } from './result-page';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ResultPage> = {
    title: 'unknown/result-page',
    component: ResultPage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResultPage>;

export const Primary: Story = {
    args: {},
};
