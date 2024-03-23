import { MintingSettings } from '@/shared/store/mint-store';
import { FormMintingSettingsValues } from '../model/form-minting-settings-values';

export const formMintingSettingsAdapter = {
    toForm: (data: MintingSettings) => ({
        premint: data.premint?.toString() || '',
        'maximum tokens': data['maximum tokens']?.toString() || '',
    }),
    toStore: (data: FormMintingSettingsValues) => ({
        premint: +data.premint || undefined,
        'maximum tokens': +data['maximum tokens'] || undefined,
    })
} as const;
