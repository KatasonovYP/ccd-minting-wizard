import cn from 'classnames';
import { useFieldArray, useForm } from 'react-hook-form';
import cls from './form-attributes.module.css';
import { FormAttributesInput } from './ui/form-attributes-input';
import type { FormAttributesValues } from './model/form-attributes-values';
import { Button } from '@/shared/ui/button';
import { useMintStore } from '@/shared/store/mint-store';

interface FormAttributesProps {
    className?: string;
}

export function FormAttributes(props: FormAttributesProps) {
    const { className } = props;

    const unique = useMintStore((state) => state.optionalFields.unique);
    const attributes = useMintStore((state) => state.attributes);
    const setAttributes = useMintStore((state) => state.setAttributes);

    const { control, handleSubmit } = useForm<FormAttributesValues>({
        values: attributes,
        // resolver: zodResolver(schema),
        // shouldFocusError: false,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attributes',
    });

    function onAction(data: FormAttributesValues) {
        console.log(...data.attributes);
        setAttributes(data);
    }

    if (!unique) {
        return null;
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
                    key={index}
                    control={control}
                    index={index}
                    name={'attributes'}
                    field={field}
                />
            ))}
            <Button
                type='button'
                onClick={() => {
                    append({ type: '', name: '', value: '' });
                    handleSubmit(onAction)();
                }}
            >
                Add attribute
            </Button>
        </form>
    );
}
