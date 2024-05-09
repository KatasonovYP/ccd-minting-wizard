import cn from 'classnames';
import { useFieldArray, useForm } from 'react-hook-form';
import cls from './form-attributes.module.css';
import { FormAttributesInput } from './ui/form-attributes-input';
import type { FormAttributesValues } from './model/form-attributes-values';
import { Button } from '@/shared/ui/button';
import { useMintStore } from '@/shared/store/mint-store';
import { Hint } from '@/shared/ui/hint';

interface FormAttributesProps {
    className?: string;
}

export function FormAttributes(props: FormAttributesProps) {
    const { className } = props;

    const attributes = useMintStore((state) => state.attributes);
    const setAttributes = useMintStore((state) => state.setAttributes);
    const isFileLoaded = useMintStore((state) => state.isFileLoaded);

    const { control, handleSubmit } = useForm<FormAttributesValues>({
        values: attributes,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attributes',
    });

    function onAction(data: FormAttributesValues) {
        setAttributes(data);
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formAttributes)}
        >
            {fields.map((field, index) => (
                <FormAttributesInput
                    remove={() => {
                        remove(index);
                        handleSubmit(onAction)();
                    }}
                    disabled={isFileLoaded}
                    key={index}
                    control={control}
                    index={index}
                    name={'attributes'}
                    field={field}
                />
            ))}
            <div className={'flex items-center justify-between'}>
                <Button
                    type='button'
                    disabled={isFileLoaded}
                    onClick={() => {
                        append({ type: 'string', name: '', value: '' });
                        handleSubmit(onAction)();
                    }}
                >
                    Add Attribute
                </Button>
                <Hint name={'attributes'} />
            </div>
        </form>
    );
}
