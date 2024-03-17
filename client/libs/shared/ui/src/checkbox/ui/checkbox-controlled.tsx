import { Controller } from 'react-hook-form';
import * as React from 'react';
import { Text } from '../../text';
import { Checkbox } from './checkbox.shadcn';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface CheckboxControlledProps<T extends FieldValues>
    extends Partial<Parameters<typeof Checkbox>[0]> {
    control: Control<T>;
    name: Path<T>;
    rules?: Parameters<typeof Controller<T>>[0]['rules'];
}

export function CheckboxControlled<T extends FieldValues>(
    props: CheckboxControlledProps<T>,
) {
    const { control, name, rules, ...otherProps } = props;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <div className='flex items-center gap-2'>
                    <Checkbox
                        {...field}
                        {...otherProps}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    <Text
                        className='capitalize'
                        text={name}
                        size={'xs'}
                    />
                </div>
            )}
        />
    );
}
