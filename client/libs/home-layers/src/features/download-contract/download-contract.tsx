import cn from 'classnames';
import { useEffect, useState } from 'react';
import cls from './download-contract.module.css';
import { useCodeStore } from '@/shared/store/code-store';
import { useMintStore } from '@/shared/store/mint-store';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';

interface DownloadContractProps {
    className?: string;
}

export function DownloadContract(props: DownloadContractProps) {
    const { className } = props;
    const identity = useMintStore((state) => state.identity);
    const functionalitySettings = useMintStore(
        (state) => state.contractFeatures,
    );
    const options = { type: 'text/plain' };
    const [file, setFile] = useState(new Blob([''], options));
    const formatCode = useCodeStore((state) => state.formatCode);

    useEffect(() => {
        formatCode(identity, functionalitySettings).then((code) =>
            setFile(new Blob([code], options)),
        );
    }, [identity, functionalitySettings]);

    return (
        <div className={cn(className, cls.downloadContract)}>
            <a
                download={`${identity.name}_contract.rs`}
                target='_blank'
                rel='noreferrer'
                href={URL.createObjectURL(file)}
                style={{
                    textDecoration: 'inherit',
                    color: 'inherit',
                }}
            >
                <DropdownMenuItem>
                    <span>Download Contract</span>
                </DropdownMenuItem>
            </a>
        </div>
    );
}
