import { jsonHandler } from './json-handler';
import type { UseFormSetError } from 'react-hook-form';
import type { FormMetadataFileValues } from '../model/form-metadata-file-values';
import { MintStoreState } from '@/shared/store/mint-store';
import { Setters } from '@/shared/types/utils';
import { Setter } from '../model/setter';

type A = Setters<MintStoreState>

export function fileRead(
    blob: Blob,
    setters: Setter[],
    setError: UseFormSetError<FormMetadataFileValues>,
) {
    const metadataReader = new FileReader();

    metadataReader.onloadend = (event) => {
        const buffer = event.target?.result;
        if (typeof buffer !== 'string') return;
        jsonHandler(buffer, setters, setError);
    };

    metadataReader.readAsText(blob);
}
