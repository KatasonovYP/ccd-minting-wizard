import { Controller } from 'react-hook-form';
import * as React from 'react';
import { Text } from '../../text';
import { ErrorMessage } from '../../error-message';
import { Label } from '../../label';
import { Input } from './input.shadcn';
import type { Control, FieldValues, Path } from 'react-hook-form';

export interface InputControlledProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    control: Control<T>;
    name: Path<T>;
    rules?: Parameters<typeof Controller<T>>[0]['rules'];
    labeled?: boolean;
    label?: string;
}

export function InputControlled<T extends FieldValues>(
    props: InputControlledProps<T>,
) {
    const {
        control,
        name,
        rules,
        labeled = true,
        className,
        label = name,
        onChange,
        ...otherProps
    } = props;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    {labeled && (
                        <Label
                            className={'capitalize placeholder:capitalize'}
                            htmlFor={name}
                        >
                            {label}
                        </Label>
                    )}
                    <Input
                        {...field}
                        {...otherProps}
                        id={name}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange && onChange(e);
                        }}
                        placeholder={`Add ${label}...`}
                    />
                    <ErrorMessage message={error?.message} />
                </div>
            )}
        />
    );
}
