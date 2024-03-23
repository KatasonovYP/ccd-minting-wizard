import { FormAttributes } from './form-attributes';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormAttributes> = {
    title: 'unknown/form-attributes',
    component: FormAttributes,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormAttributes>;

export const Primary: Story = {
    args: {},
};
