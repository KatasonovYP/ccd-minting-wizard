import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import * as React from 'react';
import { Text } from '../../text';
import { Input } from './input.shadcn';

export interface InputControlledProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    control: Control<T>;
    name: Path<T>;
    rules?: Parameters<typeof Controller<T>>[0]['rules'];
    label?: boolean;
}

export function InputControlled<T extends FieldValues>(
    props: InputControlledProps<T>,
) {
    const {
        control,
        name,
        rules,
        label = true,
        className,
        ...otherProps
    } = props;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    {label && (
                        <Text
                            className='capitalize'
                            text={name}
                            size={'xs'}
                        />
                    )}
                    <Input
                        {...field}
                        {...otherProps}
                        placeholder={`add ${name}...`}
                    />
                    {error?.message ? (
                        <Text
                            className='text-red-500'
                            size={'xs'}
                            text={error.message}
                        />
                    ) : (
                        <Text
                            className='invisible'
                            size={'xs'}
                            text='mock'
                        />
                    )}
                </div>
            )}
        />
    );
}
