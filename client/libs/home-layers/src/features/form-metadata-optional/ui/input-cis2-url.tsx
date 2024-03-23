import * as React from 'react';
import type { InputControlledProps } from '@/shared/ui/input';
import type { FieldValues, Path } from 'react-hook-form';
import { InputControlled } from '@/shared/ui/input';
import { Text } from '@/shared/ui/text';

interface InputCis2UrlProps<T extends FieldValues>
    extends InputControlledProps<T> {
    url?: string;
}

export function InputCis2Url<T extends FieldValues>(
    props: InputCis2UrlProps<T>,
) {
    const { control, name, url, ...otherProps } = props;
    return (
        <div>
            <Text
                className='capitalize'
                text={name}
                size={'xs'}
            />
            <div className={'flex justify-between gap-4'}>
                <InputControlled
                    control={control}
                    name={`${name} url` as Path<T>}
                    labeled={false}
                    {...otherProps}
                />
                <InputControlled
                    control={control}
                    name={`${name} hash` as Path<T>}
                    labeled={false}
                    disabled={!url}
                    {...otherProps}
                />
            </div>
        </div>
    );
}
