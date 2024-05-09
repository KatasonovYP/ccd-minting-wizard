import * as React from 'react';
import cn from 'classnames';
import { Input } from '../../input';
import { ErrorMessage } from '../../error-message';
import { Label } from '../../label';
import { Hint } from '../../hint';
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
        <div className='flex flex-col gap-1'>
            <Label
                className={
                    'flex cursor-pointer items-center justify-between capitalize'
                }
                htmlFor={otherProps.name}
            >
                {formReg.name}
                <Hint name={formReg.name} />
            </Label>
            <Input
                type='file'
                id={otherProps.name}
                {...otherProps}
                {...formReg}
                className={cn(className)}
            />
            <ErrorMessage message={error?.message} />
        </div>
    );
}
