import cn from 'classnames';
import { useForm } from 'react-hook-form';
import cls from './form-functionality-settings.module.css';
import type { FunctionalitySettings} from '@/shared/store/mint-store';
import { useMintStore } from '@/shared/store/mint-store';
import { CheckboxControlled } from '@/shared/ui/checkbox';

interface FormFunctionalitySettingsProps {
    className?: string;
}

type FormFunctionalitySettingsValues = FunctionalitySettings

const names: Array<keyof FunctionalitySettings> = [
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

    const setFunctionalitySettings = useMintStore(
        (state) => state.setFunctionalitySettings,
    );
    const functionalitySettings = useMintStore(
        (state) => state.functionalitySettings,
    );

    const { handleSubmit, control } = useForm<FormFunctionalitySettingsValues>({
        values: functionalitySettings,
    });

    function onAction(data: FormFunctionalitySettingsValues) {
        console.log(data);
        setFunctionalitySettings(data);
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
