import * as React from 'react';
import { Input } from '../../input';
import { Text } from '../../text';
import { ErrorMessage } from '../../error-message';
import type { FieldError } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    formReg?: any;
    error?: FieldError;
}

export function InputFile(props: InputFileProps) {
    const { className, formReg, error, ...otherProps } = props;

    return (
        <div className='flex flex-col'>
            <Text
                size={'xs'}
                text={formReg.name}
            />
            <Input
                type='file'
                {...otherProps}
                {...formReg}
                hidden
            />
            <ErrorMessage message={error?.message} />
        </div>
    );
}
