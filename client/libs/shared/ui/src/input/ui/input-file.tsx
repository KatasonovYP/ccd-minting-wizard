import * as React from 'react';
import { Input } from '../../input';
import { ErrorMessage } from '../../error-message';
import { Label } from '../../label';
import type { InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    formReg?: any;
    error?: FieldError;
}

export function InputFile(props: InputFileProps) {
    const { className, formReg, error, ...otherProps } = props;

    return (
        <div>
            <Label
                className={'cursor-pointer capitalize'}
                htmlFor={otherProps.name}
            >
                {formReg.name}
            </Label>
            <Input
                type='file'
                id={otherProps.name}
                {...otherProps}
                {...formReg}
                className='cursor-pointer border-dashed transition-colors file:border-0 file:bg-transparent file:bg-none file:font-medium file:text-transparent hover:border-gray-500'
                hidden
            />
            <ErrorMessage message={error?.message} />
        </div>
    );
}
