import cn from 'classnames';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cls from './form-identity.module.css';
import { type Identity, useMintStore } from '@/shared/store/mint-store';
import { InputControlled } from '@/shared/ui/input';

interface FormIdentityProps {
    className?: string;
}

type FormIdentityValues = Identity;

const schema = z.object({
    name: z
        .string()
        .min(2, 'at least 2 characters')
        .max(32, 'at most 32 characters'),
    description: z.string().max(512).optional(),
} satisfies Record<keyof FormIdentityValues, unknown>);

export function FormIdentity(props: FormIdentityProps) {
    const { className } = props;

    const setIdentity = useMintStore((state) => state.setIdentity);
    const identity = useMintStore((state) => state.identity);

    const { handleSubmit, control } = useForm<FormIdentityValues>({
        values: identity,
        resolver: zodResolver(schema),
    });

    function onAction(data: FormIdentityValues) {
        console.log(data);
        setIdentity(data);
    }

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, cls.formIdentity)}
        >
            <InputControlled
                control={control}
                name={'name'}
                required
            />
            <InputControlled
                control={control}
                name={'description'}
            />
        </form>
    );
}
