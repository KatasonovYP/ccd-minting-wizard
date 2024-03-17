import { Controller } from 'react-hook-form';
import * as React from 'react';
import { Text } from '../../text';
import { Input } from './input.shadcn';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface InputControlledProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    control: Control<T>;
    name: Path<T>;
    rules?: Parameters<typeof Controller<T>>[0]['rules'];
}

export function InputControlled<T extends FieldValues>(
    props: InputControlledProps<T>,
) {
    const { control, name, rules, ...otherProps } = props;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <Text
                        className='capitalize'
                        text={name}
                        size={'xs'}
                    />
                    <Input
                        {...field}
                        {...otherProps}
                        placeholder={`add ${name}...`}
                    />
                    {error?.message && (
                        <Text
                            className='text-red-500'
                            size={'xs'}
                            text={error.message}
                        />
                    )}
                    {!error && (
                        <Text
                            className='invisible'
                            text='mock'
                        />
                    )}
                </div>
            )}
        />
    );
}
