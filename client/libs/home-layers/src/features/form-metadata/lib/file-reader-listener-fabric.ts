import { jsonValidator } from './json-validator';
import type { UseFormSetError } from 'react-hook-form';
import type { FormMetadataValues } from '../model/form-metadata-values';

export type listenerFabricResult = (event: ProgressEvent<FileReader>) => void;

export function fileReaderListenerFabric<T>(
    setValue: (value: T) => unknown,
    setError: UseFormSetError<FormMetadataValues>,
): listenerFabricResult {
    function listener(event: ProgressEvent<FileReader>): void {
        const buffer = event.target?.result;
        if (typeof buffer === 'string') {
            try {
                const parsed = JSON.parse(buffer);
                if (!jsonValidator(parsed)) {
                    setError('metadata', {
                        type: 'cis-2',
                        message: 'invalid CIS-2',
                    });
                    return;
                }
                setValue(parsed);
            } catch (error) {
                setError('metadata', {
                    type: 'json',
                    message: 'invalid json',
                });
            }
        }
    }

    return listener;
}
