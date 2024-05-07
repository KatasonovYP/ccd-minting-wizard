import { Cis2, useMintStore } from '@/shared/store/mint-store';
import { useEffect, useState } from 'react';

const options = { type: 'application/json' };


export function useBlobMetadata() {
    const {
        optionalFields,
        identity,
        display,
        thumbnail,
        attributes,
    } = useMintStore((state) => state);

    const [file, setFile] = useState<Blob>(new Blob([''], options));

    useEffect(() => {
        const metadata: Cis2 = {
            ...identity,
            ...optionalFields,
            ...thumbnail,
            ...display,
        };
        metadata.attributes = attributes.attributes?.length
            ? attributes.attributes
            : undefined;
        setFile(new Blob([JSON.stringify(metadata)], options));
    }, [optionalFields, identity, display, thumbnail, attributes]);

    return { metadata: file, name: identity.name };
}
