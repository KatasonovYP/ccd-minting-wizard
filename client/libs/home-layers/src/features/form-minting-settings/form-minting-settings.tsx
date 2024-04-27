import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import cls from './form-minting-settings.module.css';
import { formMintingSettingsAdapter } from './utils/form-minting-settings-adapter';
import type { FormMintingSettingsValues } from './model/form-minting-settings-values';
import { useMintStore } from '@/shared/store/mint-store';
import { InputControlled } from '@/shared/ui/input';

interface FormMintingSettingsProps {
    className?: string;
}

const numberConstraints = z.coerce
    .number()
    .gt(-1)
    .lt(10 ** 20)
    .optional();
// .or(z.literal(''));

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
        values: formMintingSettingsAdapter.toForm(mintingSettings),
        shouldFocusError: false,
        resolver: zodResolver(schema),
    });

    function onAction(data: FormMintingSettingsValues) {
        setMintingSettings(formMintingSettingsAdapter.toStore(data));
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formIdentity)}
        >
            <div className='flex justify-between gap-4'>
                <InputControlled {...{ control, name: 'premint' }} />
                <InputControlled {...{ control, name: 'maximum tokens' }} />
            </div>
        </form>
    );
}
