import { Controller } from 'react-hook-form';
import * as React from 'react';
import cn from 'classnames';
import { Label } from '../../label';
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
    const { control, name, rules, className, ...otherProps } = props;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <div className={cn(className, 'flex items-center gap-2')}>
                    <Checkbox
                        {...field}
                        {...otherProps}
                        id={`checkbox-${name}`}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    <Label
                        className='cursor-pointer capitalize'
                        htmlFor={`checkbox-${name}`}
                    >
                        {name}
                    </Label>
                </div>
            )}
        />
    );
}
