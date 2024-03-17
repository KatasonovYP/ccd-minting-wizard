import { Link } from './link';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Link> = {
    title: 'shared/link',
    component: Link,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Primary: Story = {
    args: { href: '/', children: 'go to' },
};
