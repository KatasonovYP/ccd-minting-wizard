import { create } from 'zustand';
import type { Cis2Attribute, Cis2Url } from '../model/cis-2';
import type { Cis2Optional, Identity } from '../model/identity';
import type { MintingSettings } from '../model/minting-settings';
import type { ContractFeatures } from '../model/contract-features';
import type { Setters } from '@/shared/types/utils';

export interface MintStoreState {
    identity: Identity;
    mintingSettings: MintingSettings;
    contractFeatures: ContractFeatures;
    optionalFields: Cis2Optional;
    attributes: { attributes: Cis2Attribute[] };
    assets: { assets: Cis2Url[] };
}

export type MintStoreActions = Setters<MintStoreState>;

type Store = MintStoreState & MintStoreActions;

export const useMintStore = create<Store>(
    (set): Store => ({
        identity: {
            name: 'myToken',
            description: 'Token description',
        },
        mintingSettings: {
            premint: 0,
            'maximum tokens': 0,
        },
        contractFeatures: {
            burnable: false,
            mintable: false,
            pausable: false,
            permit: false,
            roles: false,
            sponsored: false,
            'allow updates': false,
        },
        optionalFields: {
            symbol: undefined,
            unique: undefined,
            decimals: undefined,
            thumbnail: undefined,
            display: undefined,
            artifact: undefined,
        },
        attributes: {
            attributes: [],
        },
        assets: {
            assets: [],
        },

        setIdentity: (identity) => set({ identity }),
        setMintingSettings: (mintingSettings) => set({ mintingSettings }),
        setContractFeatures: (contractFeatures) => set({ contractFeatures }),
        setOptionalFields: (optionalFields) => set({ optionalFields }),
        setAttributes: (attributes) => set({ attributes }),
        setAssets: (assets) => set({ assets }),
    }),
);
