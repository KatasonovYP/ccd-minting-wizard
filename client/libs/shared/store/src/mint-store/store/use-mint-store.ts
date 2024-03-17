import { create } from 'zustand';
import type { Identity } from '../model/identity';
import type { MintingSettings } from '../model/minting-settings';
import type { FunctionalitySettings } from '../model/functionality-settings';

interface State {
    identity: Identity;
    mintingSettings: MintingSettings;
    functionalitySettings: FunctionalitySettings;
    metadata?: FileList;
    code: string;
}

interface Actions {
    setIdentity: (identity: Identity) => void;
    setMintingSettings: (mintingSettings: MintingSettings) => void;
    setFunctionalitySettings: (
        functionalitySettings: FunctionalitySettings,
    ) => void;
    setMetadata: (metadata: FileList) => void;
}

type IStore = State & Actions;

export const useMintStore = create<IStore>(
    (set): IStore => ({
        identity: {
            name: 'myToken',
            description: 'Token description',
            symbol: 'MTK',
        },
        mintingSettings: {
            premint: '0',
            'maximum tokens': '0',
        },
        functionalitySettings: {
            burnable: false,
            mintable: false,
            pausable: false,
            permit: false,
            roles: false,
            sponsored: false,
            'allow updates': false,
        },
        metadata: undefined,
        code: '',

        setIdentity(identity) {
            set({ identity });
        },

        setMintingSettings(mintingSettings) {
            set({ mintingSettings });
        },

        setFunctionalitySettings(functionalitySettings) {
            set({ functionalitySettings });
        },

        setMetadata(metadata) {
            set({ metadata });
        },
    }),
);
