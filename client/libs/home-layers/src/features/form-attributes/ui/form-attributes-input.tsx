import { Trash } from 'lucide-react';
import { Controller } from 'react-hook-form';
import type { InputControlledProps } from '@/shared/ui/input';
import type { Cis2Attribute } from '@/shared/store/mint-store';
import type { FormAttributesValues } from '../model/form-attributes-values';
import { InputControlled } from '@/shared/ui/input';
import { Text } from '@/shared/ui/text';
import { Button } from '@/shared/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';

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
                <Controller
                    name={`${name}.${index}.type` as 'attributes.0.type'}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            onValueChange={(e) => {
                                field.onChange(e);
                            }}
                        >
                            <SelectTrigger className='mb-6'>
                                <SelectValue placeholder='select type' />
                            </SelectTrigger>
                            <SelectContent align={'end'}>
                                <SelectItem value='string'>String</SelectItem>
                                <SelectItem value='date'>Date</SelectItem>
                                <SelectItem value='number'>Number</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
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
                    type={field.type}
                    {...otherProps}
                />
            </div>
        </div>
    );
}
