import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import cls from './form-minting-settings.module.css';
import type { MintingSettings } from '@/shared/store/mint-store';
import { useMintStore } from '@/shared/store/mint-store';
import { InputControlled } from '@/shared/ui/input';

interface FormMintingSettingsProps {
    className?: string;
}

type FormMintingSettingsValues = MintingSettings;

const numberConstraints = z
    .string()
    .regex(/^0$|^[1-9]+$/, 'Must be a positive integer')
    .max(20, 'The value is too high')
    .optional();

const schema = z.object({
    premint: numberConstraints,
    'maximum tokens': numberConstraints,
});

export function FormMintingSettings(props: FormMintingSettingsProps) {
    const { className } = props;
    const setMintingSettings = useMintStore(
        (state) => state.setMintingSettings,
    );
    const mintingSettings = useMintStore((state) => state.mintingSettings);

    const { handleSubmit, control } = useForm<FormMintingSettingsValues>({
        values: mintingSettings,
        shouldFocusError: false,
        resolver: zodResolver(schema),
    });

    function onAction(data: FormMintingSettingsValues) {
        console.log(data);
        setMintingSettings({
            premint: data.premint || undefined,
            'maximum tokens': data['maximum tokens'] || undefined,
        });
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formIdentity)}
        >
            <div className='flex justify-between gap-4'>
                <InputControlled
                    {...{ control, name: 'premint', type: 'number' }}
                />
                <InputControlled
                    {...{ control, name: 'maximum tokens', type: 'number' }}
                />
            </div>
        </form>
    );
}
