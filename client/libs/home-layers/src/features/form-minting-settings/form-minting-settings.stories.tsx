import { FormMintingSettings } from './form-minting-settings';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof FormMintingSettings> = {
    title: 'unknown/form-minting-settings',
    component: FormMintingSettings,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormMintingSettings>;

export const Primary: Story = {
    args: {},
};
