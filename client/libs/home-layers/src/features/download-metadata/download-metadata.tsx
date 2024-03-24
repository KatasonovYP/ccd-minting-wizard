import cn from 'classnames';
import { useEffect, useState } from 'react';
import cls from './download-metadata.module.css';
import { Button } from '@/shared/ui/button';
import { Cis2, useMintStore } from '@/shared/store/mint-store';

interface DownloadMetadataProps {
    className?: string;
}
const options = { type: 'application/json' };

export function DownloadMetadata(props: DownloadMetadataProps) {
    const { className } = props;
    const optionalFields = useMintStore((state) => state.optionalFields);
    const mintingSettings = useMintStore((state) => state.mintingSettings);
    const identity = useMintStore((state) => state.identity);
    const attributes = useMintStore((state) => state.attributes);
    const assets = useMintStore((state) => state.assets);
    const [file, setFile] = useState<Blob>(new Blob([''], options));
    useEffect(() => {
        const metadata: Cis2 = { ...identity, ...optionalFields, ...mintingSettings };
        metadata.attributes = optionalFields.unique
            ? attributes.attributes
            : undefined;
        metadata.assets = optionalFields.unique ? assets.assets : undefined;
        setFile(new Blob([JSON.stringify(metadata)], options));
    }, [optionalFields, mintingSettings, identity, attributes, assets]);

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
