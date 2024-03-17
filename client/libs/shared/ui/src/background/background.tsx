import cn from 'classnames';
import cls from './background.module.css';
import type { ReactNode } from 'react';

export interface BackgroundProps {
    type?: 'inverted' | 'default';
    shrink?: boolean;
    children?: ReactNode;
    className?: string;
}

export function Background(props: BackgroundProps) {
    const { type = 'default', shrink = false, children, className } = props;
    const bgClasses = cn(
        cls.background,
        cls[type],
        !shrink && cls.fullScreen,
        cls.position,
    );
    return (
        <section className={bgClasses}>
            <div className={cn(cls.contentWrapper, className)}>{children}</div>
        </section>
    );
}
