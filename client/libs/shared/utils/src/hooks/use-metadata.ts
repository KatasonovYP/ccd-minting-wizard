import { Cis2, useMintStore } from '@/shared/store/mint-store';
import { useEffect, useState } from 'react';

const options = { type: 'application/json' };


export function useMetadata() {
    const {
        optionalFields,
        mintingSettings,
        identity,
        display,
        thumbnail,
        artifact,
        attributes,
        assets,
    } = useMintStore((state) => state);

    const [file, setFile] = useState<Blob>(new Blob([''], options));

    useEffect(() => {
        const metadata: Cis2 = {
            ...identity,
            ...optionalFields,
            ...mintingSettings,
            ...thumbnail,
            ...display,
        };
        metadata.attributes = optionalFields.unique
            ? attributes.attributes
            : undefined;
        metadata.assets = optionalFields.unique ? assets.assets : undefined;
        setFile(new Blob([JSON.stringify(metadata)], options));
    }, [optionalFields, mintingSettings, identity, display, thumbnail, attributes, assets]);

    return { metadata: file, name: identity.name };
}
