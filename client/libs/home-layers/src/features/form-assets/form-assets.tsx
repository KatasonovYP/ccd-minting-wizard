import cn from 'classnames';
import { useFieldArray, useForm } from 'react-hook-form';
import cls from './form-assets.module.css';
import { FormAssetsInput } from './ui/form-assets-input';
import type { FormAssetsValues } from './model/form-assets-values';
import { useMintStore } from '@/shared/store/mint-store';
import { Button } from '@/shared/ui/button';

interface FormAssetsProps {
    className?: string;
}

export function FormAssets(props: FormAssetsProps) {
    const { className } = props;

    const unique = useMintStore((state) => state.optionalFields.unique);
    const assets = useMintStore((state) => state.assets);
    const setAssets = useMintStore((state) => state.setAssets);

    const { control, handleSubmit } = useForm<FormAssetsValues>({
        values: assets,
        // resolver: zodResolver(schema),
        // shouldFocusError: false,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'assets',
    });

    function onAction(data: FormAssetsValues) {
        console.log(...data.assets);
        setAssets(data);
    }

    if (!unique) {
        return null;
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formAssets)}
        >
            {fields.map((field, index) => (
                <FormAssetsInput
                    remove={() => {
                        remove(index);
                        handleSubmit(onAction)();
                    }}
                    key={index}
                    control={control}
                    index={index}
                    name={'assets'}
                    field={field}
                />
            ))}
            <Button
                type='button'
                onClick={() => {
                    append({ url: '', hash: '' });
                    handleSubmit(onAction)();
                }}
            >
                Add Asset
            </Button>
        </form>
    );
}
