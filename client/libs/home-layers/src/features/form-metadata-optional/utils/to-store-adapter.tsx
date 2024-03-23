import { getCleanUrl } from './get-clean-url';
import type { FormMetadataOptionalValues } from '../model/form-metadata-optional-values';
import type { Cis2Optional } from '@/shared/store/mint-store';

export function toStoreAdapter(data: FormMetadataOptionalValues): Cis2Optional {
    return {
        symbol: data.symbol || undefined,
        decimals: Number(data.decimals) || undefined,
        unique: data.unique || undefined,
        thumbnail: getCleanUrl(data, 'thumbnail'),
        display: getCleanUrl(data, 'display'),
        artifact: getCleanUrl(data, 'artifact'),
    };
}
