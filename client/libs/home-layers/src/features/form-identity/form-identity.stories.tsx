import { FormIdentity } from './form-identity';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormIdentity> = {
    title: 'unknown/form-identity',
    component: FormIdentity,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormIdentity>;

export const Primary: Story = {
    args: {},
};
