import cn from 'classnames';
import { useEffect, useState } from 'react';
import cls from './download-metadata.module.css';
import { Button } from '@/shared/ui/button';
import { useMintStore } from '@/shared/store/mint-store';

interface DownloadMetadataProps {
    className?: string;
}
const options = { type: 'application/json' };

export function DownloadMetadata(props: DownloadMetadataProps) {
    const { className } = props;
    const optionalFields = useMintStore((state) => state.optionalFields);
    const identity = useMintStore((state) => state.identity);
    const attributes = useMintStore((state) => state.attributes);
    const [file, setFile] = useState<Blob>(new Blob([''], options));
    useEffect(() => {
        const metadata = { ...identity, ...optionalFields };
        metadata.attributes = optionalFields.unique
            ? attributes.attributes
            : undefined;
        console.log(metadata);
        setFile(new Blob([JSON.stringify(metadata)], options));
    }, [optionalFields, identity, attributes]);

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
