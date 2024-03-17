import { Text } from './text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
    title: 'shared/text',
    component: Text,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

const text = '— Любя, съешь щипцы, — вздохнёт мэр, — кайф жгуч.';
const className = 'text-white';
const defaultProps = { text, className, display: false };

export const DisplayBoldXXL: Story = {
    args: {
        ...defaultProps,
        display: true,
        size: 'xxl',
        weight: 'bold',
    },
};

export const DisplayBoldXL: Story = {
    args: {
        ...defaultProps,
        display: true,
        size: 'xl',
        weight: 'bold',
    },
};

export const TextBoldLarge: Story = {
    args: {
        ...defaultProps,
        size: 'lg',
        weight: 'bold',
    },
};

export const TextSemiboldLarge: Story = {
    args: {
        ...defaultProps,
        size: 'lg',
        weight: 'semibold',
    },
};

export const TextMediumLarge: Story = {
    args: {
        ...defaultProps,
        size: 'lg',
        weight: 'medium',
    },
};

export const TextRegularLarge: Story = {
    args: {
        ...defaultProps,
        size: 'lg',
        weight: 'regular',
    },
};

export const TextSemiboldMedium: Story = {
    args: {
        ...defaultProps,
        size: 'md',
        weight: 'semibold',
    },
};

export const TextSemiboldSmall: Story = {
    args: {
        ...defaultProps,
        size: 'sm',
        weight: 'semibold',
    },
};

export const SemiboldXS: Story = {
    args: {
        ...defaultProps,
        size: 'xs',
        weight: 'semibold',
    },
};
