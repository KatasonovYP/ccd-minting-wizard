import { jsonHandler } from './json-handler';
import type { Setter } from '../model/setter';
import type { UseFormSetError } from 'react-hook-form';
import type { FormMetadataFileValues } from '../model/form-metadata-file-values';

export function readFileJson(
    blob: Blob,
    setters: Setter[],
    setError: UseFormSetError<FormMetadataFileValues>,
) {
    const onLoadEnd = (event: ProgressEvent<FileReader>) => {
        const buffer = event.target?.result;
        if (typeof buffer !== 'string') return;
        jsonHandler(buffer, setters, setError);
    };

    const metadataReader = new FileReader();
    metadataReader.onloadend = onLoadEnd;
    metadataReader.readAsText(blob);
}
