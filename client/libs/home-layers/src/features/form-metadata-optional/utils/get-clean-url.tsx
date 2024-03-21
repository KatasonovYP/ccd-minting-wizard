import { Cis2Optional, Cis2Url } from '@/shared/store/mint-store';
import { FormMetadataOptionalValues } from '../model/form-metadata-optional-values';

export function getCleanUrl(
    data: FormMetadataOptionalValues,
    key: keyof Cis2Optional,
): Cis2Url | undefined {
    const url = data[
        `${key} url` as keyof FormMetadataOptionalValues
    ] as string;
    const hash = data[
        `${key} hash` as keyof FormMetadataOptionalValues
    ] as string;
    if (!url) return undefined;
    if (!hash) return { url };
    return { url, hash };
}
