import cn from 'classnames';
import cls from './download-contract.module.css';
import { useCodeStore } from '@/shared/store/code-store';
import { Button } from '@/shared/ui/button';
import { useMintStore } from '@/shared/store/mint-store';

interface DownloadContractProps {
    className?: string;
}

export function DownloadContract(props: DownloadContractProps) {
    const { className } = props;
    const identity = useMintStore((state) => state.identity);
    const code = useCodeStore((state) => state.formatCode(identity));
    const file = new Blob([code], { type: 'text/plain' });
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
                <Button variant={'outline'}>Download</Button>
            </a>
        </div>
    );
}
