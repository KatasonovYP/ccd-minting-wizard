import cn from 'classnames';
import { useForm } from 'react-hook-form';
import cls from './form-functionality-settings.module.css';
import type { ContractFeatures } from '@/shared/store/mint-store';
import { useMintStore } from '@/shared/store/mint-store';
import { CheckboxControlled } from '@/shared/ui/checkbox';

interface FormFunctionalitySettingsProps {
    className?: string;
}

type FormFunctionalitySettingsValues = ContractFeatures;

const names: Array<keyof ContractFeatures> = [
    'mintable',
    'burnable',
    'pausable',
    'permit',
    'roles',
    'allow updates',
    'sponsored',
];

export function FormFunctionalitySettings(
    props: FormFunctionalitySettingsProps,
) {
    const { className } = props;

    const setContractFeatures = useMintStore(
        (state) => state.setContractFeatures,
    );
    const contractFeatures = useMintStore(
        (state) => state.contractFeatures,
    );

    const { handleSubmit, control } = useForm<FormFunctionalitySettingsValues>({
        values: contractFeatures,
    });

    function onAction(data: FormFunctionalitySettingsValues) {
        console.log(data);
        setContractFeatures(data);
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formFunctionalitySettings)}
        >
            {names.map((name) => (
                <CheckboxControlled
                    key={name}
                    control={control}
                    name={name}
                />
            ))}
        </form>
    );
}
