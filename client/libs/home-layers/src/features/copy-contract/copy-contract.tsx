import cn from 'classnames';
import { useEffect, useState } from 'react';
import cls from './copy-contract.module.css';
import { useMintStore } from '@/shared/store/mint-store';
import { useCodeStore } from '@/shared/store/code-store';
import { Button } from '@/shared/ui/button';

interface CopyContractProps {
    className?: string;
}

export function CopyContract(props: CopyContractProps) {
    const { className } = props;
    const identity = useMintStore((state) => state.identity);
    const functionalitySettings = useMintStore(
        (state) => state.functionalitySettings,
    );
    const [code, setCode] = useState<string>('');
    const formatCode = useCodeStore((state) => state.formatCode);

    useEffect(() => {
        formatCode(identity, functionalitySettings).then(setCode);
    }, [identity, functionalitySettings, formatCode]);

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
