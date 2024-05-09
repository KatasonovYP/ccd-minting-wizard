import { create } from 'zustand';
import type { Cis2Attribute, Cis2Url } from '../model/cis-2';
import type { Cis2Optional, Identity } from '../model/identity';
import type { MintingSettings } from '../model/minting-settings';
import type { ContractFeatures } from '../model/contract-features';
import type { Setters } from '@/shared/types/utils';
import { defaultMetadataValues } from '../model/default-metadata-values';

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
    metadataFile?: FileList;
    isTestNet: boolean;
    isFileLoaded: boolean;
}

export interface MintStoreActions extends Setters<MintStoreState> {
    reset: () => void;
}

type Store = MintStoreState & MintStoreActions;

export const useMintStore = create<Store>(
    (set): Store => ({
        ...defaultMetadataValues,
        mintingSettings: {
            premint: undefined,
            'maximum tokens': undefined,
        },
        contractFeatures: {
            mintable: false,
            burnable: false,
            pausable: false,
            roles: false,
            upgradable: false,
            sponsored: false,
        },
        isTestNet: false,
        isFileLoaded: false,
        metadataFile: undefined,

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
        setIsFileLoaded: (isFileLoaded) => set({ isFileLoaded }),
        setMetadataFile: (metadataFile) => set({ metadataFile }),
        reset: () => set({ ...defaultMetadataValues }),
    }),
);
