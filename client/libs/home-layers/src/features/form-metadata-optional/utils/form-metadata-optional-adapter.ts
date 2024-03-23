import { FormMetadataOptionalValues } from '../model/form-metadata-optional-values';
import { getCleanUrl } from './get-clean-url';
import type { Cis2Optional } from '@/shared/store/mint-store';

export const formMetadataOptionalAdapter = {
    toForm: (data: Cis2Optional) => ({
        symbol: data.symbol || '',
        unique: !!data.unique || false,
        decimals: data.decimals?.toString() || '',
        'thumbnail url': data.thumbnail?.url || '',
        'thumbnail hash': data.thumbnail?.hash || '',
        'display url': data.display?.url || '',
        'display hash': data.display?.hash || '',
        'artifact url': data.artifact?.url || '',
        'artifact hash': data.artifact?.hash || '',
    }),
    toStore: (data: FormMetadataOptionalValues) => ({
        symbol: data.symbol || undefined,
        decimals: Number(data.decimals) || undefined,
        unique: data.unique || undefined,
        thumbnail: getCleanUrl(data, 'thumbnail'),
        display: getCleanUrl(data, 'display'),
        artifact: getCleanUrl(data, 'artifact'),
    }),
} as const;
