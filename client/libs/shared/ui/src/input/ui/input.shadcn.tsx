import * as React from 'react';
import cn from 'classnames';
import cls from '../input.module.css';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    type === 'file' &&
                        'flex h-10 rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white text-secondary-foreground hover:bg-slate-100 disabled:hover:bg-white cursor-pointer',
                    type !== 'file' &&
                        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full',
                    className,
                    cls.input,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
