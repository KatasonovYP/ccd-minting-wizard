import cn from 'classnames';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import cls from './copy-contract.module.css';
import { Button } from '@/shared/ui/button';
import { useCode } from '@/shared/utils/hooks';

interface CopyContractProps {
    className?: string;
}

export function CopyContract(props: CopyContractProps) {
    const { className } = props;
    const { code } = useCode();
    const [copied, setCopied] = useState(false);

    function clickHandler() {
        navigator.clipboard.writeText(code!).then(null);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <Button
            onClick={clickHandler}
            variant={'outline'}
            size={'icon'}
            className={cn(className, cls.copyContract)}
        >
            {copied ? <Check size={'16'} /> : <Copy size={'16'} />}
        </Button>
    );
}
