import cn from 'classnames';
import { Link as ParentLink } from 'react-router-dom';
import cls from './link.module.css';
import type { LinkProps as ParentLinkProps, To } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface LinkProps extends Omit<ParentLinkProps, 'to'> {
    href: To;
    children?: ReactNode;
    className?: string;
}

export function Link(props: LinkProps) {
    const { className, children, href, ...otherProps } = props;

    return (
        <ParentLink
            to={href}
            className={cn(className, cls.link)}
            {...otherProps}
        >
            {children}
        </ParentLink>
    );
}
