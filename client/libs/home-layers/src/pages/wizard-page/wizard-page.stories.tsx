import { WizardPage } from './wizard-page';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof WizardPage> = {
    title: 'unknown/wizard-page',
    component: WizardPage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WizardPage>;

export const Primary: Story = {
    args: {},
};
