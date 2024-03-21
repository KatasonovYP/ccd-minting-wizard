import {
    InputControlled,
    InputControlledProps,
} from '../../../../../shared/ui/src/input';
import { FieldValues, Path } from 'react-hook-form';
import { Text } from '../../../../../shared/ui/src/text';
import * as React from 'react';

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
                    label={false}
                    {...otherProps}
                />
                <InputControlled
                    control={control}
                    name={`${name} hash` as Path<T>}
                    label={false}
                    disabled={!url}
                    {...otherProps}
                />
            </div>
        </div>
    );
}
