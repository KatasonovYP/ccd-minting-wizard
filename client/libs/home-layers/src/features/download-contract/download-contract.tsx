import cn from 'classnames';
import { useEffect, useState } from 'react';
import cls from './download-contract.module.css';
import { useMintStore } from '@/shared/store/mint-store';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { useCode } from '@/shared/utils/hooks';

interface DownloadContractProps {
    className?: string;
}

export function DownloadContract(props: DownloadContractProps) {
    const { className } = props;
    const identity = useMintStore((state) => state.identity);
    const options = { type: 'text/plain' };
    const { code } = useCode();
    const [file, setFile] = useState(new Blob([''], options));

    useEffect(() => {
        if (code) {
            setFile(new Blob([code], options));
        }
    }, [code]);

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
