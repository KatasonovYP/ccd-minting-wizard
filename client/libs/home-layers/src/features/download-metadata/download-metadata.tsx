import cn from 'classnames';
import cls from './download-metadata.module.css';
import { Button } from '@/shared/ui/button';
import { useMintStore } from '@/shared/store/mint-store';

interface DownloadMetadataProps {
    className?: string;
}

export function DownloadMetadata(props: DownloadMetadataProps) {
    const { className } = props;
    const metadata = useMintStore((state) => state.metadata);
    const identity = useMintStore((state) => state.identity);
    console.log(metadata);
    // file = new Blob([code], options)

    return (
        <div className={cn(className, cls.downloadMetadata)}>
            <a
                download={`${identity.name}_contract.rs`}
                target='_blank'
                rel='noreferrer'
                // href={URL.createObjectURL(file)}
                style={{
                    textDecoration: 'inherit',
                    color: 'inherit',
                }}
            >
                <Button variant={'outline'}>Download Metadata</Button>
            </a>
        </div>
    );
}
