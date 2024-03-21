import cn from 'classnames';
import cls from './download-metadata.module.css';
import { Button } from '@/shared/ui/button';
import { useMintStore } from '@/shared/store/mint-store';
import { useEffect, useState } from 'react';

interface DownloadMetadataProps {
    className?: string;
}
const options = { type: 'application/json' };

export function DownloadMetadata(props: DownloadMetadataProps) {
    const { className } = props;
    const optionalFields = useMintStore((state) => state.optionalFields);
    const identity = useMintStore((state) => state.identity);
    const [file, setFile] = useState<Blob>(new Blob([''], options));
    useEffect(() => {
        setFile(
            new Blob(
                [JSON.stringify({ ...identity, ...optionalFields })],
                options,
            ),
        );
    }, [optionalFields, identity]);

    return (
        <div className={cn(className, cls.downloadMetadata)}>
            <a
                download={`${identity.name}_metadata.json`}
                target='_blank'
                rel='noreferrer'
                href={URL.createObjectURL(file)}
            >
                <Button variant={'outline'}>Download Metadata</Button>
            </a>
        </div>
    );
}
