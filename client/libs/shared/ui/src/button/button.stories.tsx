import { Button } from './button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    title: 'shared/button',
    component: Button,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

const children = 'click me';

export const Solid: Story = {
    args: {
        theme: 'solid',
        children,
    },
};

export const SolidLarge: Story = {
    args: {
        theme: 'solid',
        size: 'lg',
        children,
    },
};

export const Outline: Story = {
    args: {
        theme: 'outline',
        children,
    },
};

export const SecondaryOutline: Story = {
    args: {
        theme: 'secondary-outline',
        children,
    },
};

export const InvertedOutline: Story = {
    args: {
        theme: 'inverted-outline',
        children,
    },
    parameters: {
        backgrounds: { default: 'light' },
    },
};

export const Disabled: Story = {
    args: {
        theme: 'inverted-outline',
        disabled: true,
        children,
    },
};

export const SolidLightBackground: Story = {
    args: {
        theme: 'solid',
        children,
    },
    parameters: {
        backgrounds: { default: 'light' },
    },
};

export const DisabledLightBackground: Story = {
    args: {
        theme: 'inverted-outline',
        disabled: true,
        children,
    },
    parameters: {
        backgrounds: { default: 'light' },
    },
};
