import { cis2Validator } from './cis2-validator';
import type { Setter } from '../model/setters';
import type { UseFormSetError } from 'react-hook-form';
import type { FormMetadataValues } from '../model/form-metadata-values';

const errors = {
    json: {
        type: 'json',
        message: 'invalid JSON',
    },
    cis2: {
        type: 'cis-2',
        message: 'invalid CIS-2',
    },
} as const;

export function jsonHandler(
    buffer: string,
    setters: Setter[],
    setError: UseFormSetError<FormMetadataValues>,
) {
    try {
        const parsed = JSON.parse(buffer);

        if (cis2Validator(parsed)) {
            setters.map((set) => set(parsed));
        } else {
            setError('metadata', errors.cis2);
        }
    } catch (error) {
        setError('metadata', errors.json);
    }
}
