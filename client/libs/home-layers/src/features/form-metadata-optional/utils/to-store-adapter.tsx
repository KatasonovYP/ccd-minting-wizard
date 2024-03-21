import { FormMetadataOptionalValues } from '../model/form-metadata-optional-values';
import { Cis2Optional } from '@/shared/store/mint-store';
import { getCleanUrl } from './get-clean-url';

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
