import type { Meta, StoryObj } from '@storybook/react';

import { FormMetadataOptional } from './form-metadata-optional';

const meta: Meta<typeof FormMetadataOptional> = {
    title: 'unknown/form-metadata-optional',
    component: FormMetadataOptional,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormMetadataOptional>;

export const Primary: Story = {
    args: {},
};
