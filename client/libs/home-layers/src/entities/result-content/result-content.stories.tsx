import { ResultContent } from './result-content';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ResultContent> = {
    title: 'unknown/result-content',
    component: ResultContent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResultContent>;

export const Primary: Story = {
    args: {},
};
