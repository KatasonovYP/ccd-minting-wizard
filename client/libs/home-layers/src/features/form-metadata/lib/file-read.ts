import { jsonHandler } from './json-handler';
import type { Setter } from '../model/setters';
import type { UseFormSetError } from 'react-hook-form';
import type { FormMetadataValues } from '../model/form-metadata-values';

export function fileRead(
    blob: Blob,
    setters: Setter[],
    setError: UseFormSetError<FormMetadataValues>,
) {
    const metadataReader = new FileReader();

    metadataReader.onloadend = (event) => {
        const buffer = event.target?.result;
        if (typeof buffer !== 'string') return;
        jsonHandler(buffer, setters, setError);
    };

    metadataReader.readAsText(blob);
}
