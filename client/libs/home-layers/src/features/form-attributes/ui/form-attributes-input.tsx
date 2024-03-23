import { Trash } from 'lucide-react';
import type { InputControlledProps } from '@/shared/ui/input';
import type { Cis2Attribute } from '@/shared/store/mint-store';
import type { FormAttributesValues } from '../model/form-attributes-values';
import { InputControlled } from '@/shared/ui/input';
import { Text } from '@/shared/ui/text';
import { Button } from '@/shared/ui/button';

interface FormAttributesInputProps
    extends InputControlledProps<FormAttributesValues> {
    field: Cis2Attribute;
    index: number;
    remove: () => void;
}

export function FormAttributesInput(props: FormAttributesInputProps) {
    const { control, name, index, field, remove, ...otherProps } = props;
    return (
        <div>
            <div className='mb-2 flex items-center justify-between'>
                <Text
                    className='capitalize'
                    text={`attribute ${index + 1}`}
                    size={'xs'}
                />
                <Button
                    type='button'
                    size='icon'
                    variant='link'
                    onClick={remove}
                    className='hover:text-red-500'
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <div className={''}>
                <InputControlled
                    control={control}
                    name={`${name}.${index}.type` as 'attributes.0.type'}
                    labeled={false}
                    label={'type'}
                    {...otherProps}
                />
                <InputControlled
                    control={control}
                    name={`${name}.${index}.name` as 'attributes.0.name'}
                    labeled={false}
                    label={'name'}
                    {...otherProps}
                />
                <InputControlled
                    control={control}
                    name={`${name}.${index}.value` as 'attributes.0.value'}
                    labeled={false}
                    label={'value'}
                    {...otherProps}
                />
            </div>
        </div>
    );
}
