import cn from 'classnames';
import cls from './spinner.module.css';
import { SpinnerIcon } from '@/shared/assets/icons';

interface SpinnerProps {
    className?: string;
}

export function Spinner(props: SpinnerProps) {
    const { className } = props;

    return (
        <div
            role='status'
            className={cn(className, cls.spinnerWrapper)}
        >
            <SpinnerIcon className={cn(cls.spinner, 'animate-spin')} />
            <span className='sr-only'>Loading...</span>
        </div>
    );
}
