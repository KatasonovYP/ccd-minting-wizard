import cn from 'classnames';
import { useForm } from 'react-hook-form';
import cls from './form-functionality-settings.module.css';
import type { ContractFeatures } from '@/shared/store/mint-store';
import { useMintStore } from '@/shared/store/mint-store';
import { CheckboxControlled } from '@/shared/ui/checkbox';
import { CircleHelp } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/shared/ui/tooltip';

interface FormFunctionalitySettingsProps {
    className?: string;
}

export function getHelpText(name: string) {
    switch (name) {
        case 'mintable':
            return 'mintable help text';
        case 'burnable':
            return 'burnable help text';
        case 'pausable':
            return 'pausable help text';
        case 'sponsored':
            return 'sponsored help text';
        case 'roles':
            return 'roles help text';
        case 'upgradable':
            return 'upgradable help text';
    }
}

type FormFunctionalitySettingsValues = ContractFeatures;

const names: Array<keyof ContractFeatures> = [
    'mintable',
    'burnable',
    'pausable',
    'sponsored',
    'roles',
    'upgradable',
];

export function FormFunctionalitySettings(
    props: FormFunctionalitySettingsProps,
) {
    const { className } = props;

    const setContractFeatures = useMintStore(
        (state) => state.setContractFeatures,
    );
    const contractFeatures = useMintStore((state) => state.contractFeatures);

    const { handleSubmit, control } = useForm<FormFunctionalitySettingsValues>({
        values: contractFeatures,
    });

    function onAction(data: FormFunctionalitySettingsValues) {
        setContractFeatures(data);
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formFunctionalitySettings)}
        >
            {names.map((name) => (
                <div className={'flex justify-between'}>
                    <CheckboxControlled
                        key={name}
                        control={control}
                        name={name}
                    />
                    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger>
                                <CircleHelp size={16} />
                            </TooltipTrigger>
                            <TooltipContent>{getHelpText(name)}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ))}
        </form>
    );
}
