import { fileReaderListenerFabric } from './file-reader-listener-fabric';
import type { UseFormSetError } from 'react-hook-form';
import type { FormMetadataValues } from '../model/form-metadata-values';

export function fileRead<T>(
    blob: Blob,
    setValue: (value: T) => unknown,
    setError: UseFormSetError<FormMetadataValues>,
) {
    const metadataReader = new FileReader();
    metadataReader.onloadend = fileReaderListenerFabric(setValue, setError);
    metadataReader.readAsText(blob);
}
