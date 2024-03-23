import { FormAssets } from './form-assets';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof FormAssets> = {
    title: 'unknown/form-assets',
    component: FormAssets,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormAssets>;

export const Primary: Story = {
    args: {},
};
