import { create } from 'zustand';
import type { Cis2Optional, Identity } from '../model/identity';
import type { MintingSettings } from '../model/minting-settings';
import type { ContractFeatures } from '../model/contract-features';

interface State {
    identity: Identity;
    mintingSettings: MintingSettings;
    contractFeatures: ContractFeatures;
    optionalFields: Cis2Optional;
}

interface Actions {
    setIdentity: (identity: Identity) => void;
    setMintingSettings: (mintingSettings: MintingSettings) => void;
    setContractFeatures: (contractFeatures: ContractFeatures) => void;
    setOptionalFields: (optionalFields: Cis2Optional) => void;
}

type Store = State & Actions;

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
            artifact: undefined,
            assets: undefined,
            attributes: undefined,
            decimals: undefined,
            display: undefined,
            localization: undefined,
            unique: undefined,
            thumbnail: undefined,
        },

        setIdentity: (identity) => set({ identity }),
        setMintingSettings: (mintingSettings) => set({ mintingSettings }),
        setContractFeatures: (contractFeatures) => set({ contractFeatures }),
        setOptionalFields: (optionalFields) => set({ optionalFields }),
    }),
);
