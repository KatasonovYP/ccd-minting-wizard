import { FormImages } from './form-images';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof FormImages> = {
    title: 'unknown/form-images',
    component: FormImages,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormImages>;

export const Primary: Story = {
    args: {},
};
