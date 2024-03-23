import cn from 'classnames';
import * as React from 'react';
import { Text } from '../text';
import cls from './error-message.module.css';

interface ErrorMessageProps {
    className?: string;
    message?: string;
}

export function ErrorMessage(props: ErrorMessageProps) {
    const { className, message } = props;

    return (
        <div className={cn(className, cls.errorMessage)}>
            {message ? (
                <Text
                    className='text-red-500'
                    size={'xs'}
                    text={message}
                />
            ) : (
                <Text
                    size={'xs'}
                    className='invisible'
                    text='mock'
                />
            )}
        </div>
    );
}
