import { FormFunctionalitySettings } from './form-functionality-settings';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof FormFunctionalitySettings> = {
    title: 'unknown/form-functionality-settings',
    component: FormFunctionalitySettings,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormFunctionalitySettings>;

export const Primary: Story = {
    args: {},
};
