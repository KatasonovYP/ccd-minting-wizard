import { create } from 'zustand';
import { plainText as initialCode } from '../assets/code.rs';
import { useMintStore } from '../../mint-store';
import type { Identity } from '../../mint-store';

interface State {
    code: string;
}

interface Actions {
    formatCode: (identity: Identity) => string;
}

type Store = State & Actions;

export const useCodeStore = create<Store>((set, get): Store => {
    return {
        code: initialCode,
        formatCode: (identity) => {
            return initialCode
                .replace('{name}', identity.name)
                .replace('{description}', identity.description)
                .replace('{symbol}', identity.symbol);
        },
    };
});
