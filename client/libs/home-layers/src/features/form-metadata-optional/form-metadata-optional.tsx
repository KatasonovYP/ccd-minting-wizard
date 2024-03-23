import cn from 'classnames';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cls from './form-metadata-optional.module.css';
import { InputCis2Url } from './ui/input-cis2-url';
import { toFormAdapter } from './utils/to-form-adapter';
import { toStoreAdapter } from './utils/to-store-adapter';
import type { Cis2Optional, Cis2Url } from '@/shared/store/mint-store';
import { useMintStore } from '@/shared/store/mint-store';
import type { FormMetadataOptionalValues } from './model/form-metadata-optional-values';
import { CheckboxControlled } from '@/shared/ui/checkbox';
import { InputControlled } from '@/shared/ui/input';

interface FormMetadataOptionalProps {
    className?: string;
}

const fieldsUrl: Array<keyof Cis2Optional> = [
    'thumbnail',
    'display',
    'artifact',
];

const zodUrl = z
    .string()
    .url()
    .regex(/\.(gif|jpg|jpeg|tiff|png)$/, 'file must be an image')
    .optional()
    .or(z.literal(''));

const schema = z.object({
    symbol: z
        .string()
        .min(2, 'at least 2 characters')
        .max(8, 'at most 8 characters')
        .optional()
        .or(z.literal('')),
    unique: z.boolean().optional(),
    decimals: z.coerce.number().positive().max(10).optional().or(z.literal('')),
    'thumbnail url': zodUrl,
    'thumbnail hash': z.string().optional(),
    'display url': zodUrl,
    'display hash': z.string().optional(),
    'artifact url': zodUrl,
    'artifact hash': z.string().optional(),
} satisfies Record<keyof FormMetadataOptionalValues, unknown>);

export function FormMetadataOptional(props: FormMetadataOptionalProps) {
    const { className } = props;

    const optionalFields = useMintStore((state) => state.optionalFields);
    const setOptionalFields = useMintStore((state) => state.setOptionalFields);

    const { control, handleSubmit } = useForm<FormMetadataOptionalValues>({
        values: toFormAdapter(optionalFields),
        resolver: zodResolver(schema),
        shouldFocusError: false,
    });

    function onAction(data: FormMetadataOptionalValues) {
        console.log(data);
        setOptionalFields(toStoreAdapter(data));
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formMetadataOptional)}
        >
            <InputControlled
                control={control}
                name={'symbol'}
            />
            <InputControlled
                control={control}
                name={'decimals'}
                type='number'
            />
            {fieldsUrl.map((name, id) => (
                <InputCis2Url
                    control={control}
                    name={name as keyof FormMetadataOptionalValues}
                    key={id}
                    url={(optionalFields[name] as Cis2Url)?.url}
                />
            ))}
            <CheckboxControlled
                control={control}
                name={'unique'}
            />
        </form>
    );
}
