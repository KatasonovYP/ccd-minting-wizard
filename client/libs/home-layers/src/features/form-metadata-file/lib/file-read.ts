import { jsonHandler } from './json-handler';
import type { Setter } from '../model/setter';
import type { UseFormSetError } from 'react-hook-form';
import type { FormMetadataFileValues } from '../model/form-metadata-file-values';

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
