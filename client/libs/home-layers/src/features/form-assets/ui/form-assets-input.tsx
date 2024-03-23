import { InputControlled, InputControlledProps } from '@/shared/ui/input';
import { Text } from '@/shared/ui/text';
import { Button } from '@/shared/ui/button';
import { Trash } from 'lucide-react';
import { Cis2Url } from '@/shared/store/mint-store';
import { FormAssetsValues } from '../model/form-assets-values';

interface FormAssetsInputProps extends InputControlledProps<FormAssetsValues> {
    field: Cis2Url;
    index: number;
    remove: () => void;
}

export function FormAssetsInput(props: FormAssetsInputProps) {
    const { control, name, index, field, remove, ...otherProps } = props;
    return (
        <div>
            <div className='mb-2 flex items-center justify-between'>
                <Text
                    className='capitalize'
                    text={`asset ${index + 1}`}
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
                    name={`${name}.${index}.url` as 'assets.0.url'}
                    labeled={false}
                    label={'url'}
                    {...otherProps}
                />
                <InputControlled
                    control={control}
                    name={`${name}.${index}.hash` as 'assets.0.hash'}
                    labeled={false}
                    label={'hash'}
                    {...otherProps}
                />
            </div>
        </div>
    );
}
