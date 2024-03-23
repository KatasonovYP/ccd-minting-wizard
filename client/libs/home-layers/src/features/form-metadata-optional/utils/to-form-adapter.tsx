import type { FormMetadataOptionalValues } from '../model/form-metadata-optional-values';
import type { Cis2Optional } from '@/shared/store/mint-store';

export function toFormAdapter(data: Cis2Optional): FormMetadataOptionalValues {
    return {
        symbol: data.symbol || '',
        unique: !!data.unique || false,
        decimals: data.decimals?.toString() || '',
        'thumbnail url': data.thumbnail?.url || '',
        'thumbnail hash': data.thumbnail?.hash || '',
        'display url': data.display?.url || '',
        'display hash': data.display?.hash || '',
        'artifact url': data.artifact?.url || '',
        'artifact hash': data.artifact?.hash || '',
    };
}
