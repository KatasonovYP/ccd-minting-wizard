import cn from 'classnames';
import cls from './copy-contract.module.css';
import { Button } from '@/shared/ui/button';
import { useCode } from '@/shared/utils/hooks';

interface CopyContractProps {
    className?: string;
}

export function CopyContract(props: CopyContractProps) {
    const { className } = props;
    const { code } = useCode();

    function clickHandler() {
        navigator.clipboard.writeText(code).then(null);
    }

    return (
        <Button
            onClick={clickHandler}
            variant={'outline'}
            className={cn(className, cls.copyContract)}
        >
            Copy To Clipboard
        </Button>
    );
}
