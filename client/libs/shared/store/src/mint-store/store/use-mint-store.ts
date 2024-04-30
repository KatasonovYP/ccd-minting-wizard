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
    display: { display?: Cis2Url };
    thumbnail: { thumbnail?: Cis2Url };
    artifact: { artifact?: Cis2Url };
    isTestNet: boolean;
}

export type MintStoreActions = Setters<MintStoreState>;

type Store = MintStoreState & MintStoreActions;

export const useMintStore = create<Store>(
    (set): Store => ({
        identity: {
            name: 'myToken',
            description: '',
        },
        mintingSettings: {
            premint: undefined,
            'maximum tokens': undefined,
        },
        contractFeatures: {
            mintable: false,
            burnable: false,
            pausable: false,
            sponsored: false,
            roles: false,
            upgradable: false,
        },
        optionalFields: {
            symbol: undefined,
            unique: undefined,
            decimals: undefined,
        },
        display: {
            display: undefined,
        },
        thumbnail: {
            thumbnail: undefined,
        },
        artifact: {
            artifact: undefined,
        },
        attributes: {
            attributes: [],
        },
        assets: {
            assets: [],
        },
        isTestNet: false,

        setIdentity: (identity) => set({ identity }),
        setMintingSettings: (mintingSettings) => set({ mintingSettings }),
        setContractFeatures: (contractFeatures) => set({ contractFeatures }),
        setOptionalFields: (optionalFields) => set({ optionalFields }),
        setAttributes: (attributes) => set({ attributes }),
        setAssets: (assets) => set({ assets }),
        setDisplay: (display) => set({ display }),
        setThumbnail: (thumbnail) => set({ thumbnail }),
        setArtifact: (artifact) => set({ artifact }),
        setIsTestNet: (isTestNet) => set({ isTestNet }),
    }),
);
