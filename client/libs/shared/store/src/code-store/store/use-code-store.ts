import { create } from 'zustand';
// import rustPlugin from 'prettier-plugin-rust';
// import prettier from 'prettier/standalone';
import { plainText as initialCode } from '../assets/code.rs';
import type { ContractFeatures, Identity } from '../../mint-store';

interface State {
    code: string;
}

interface Actions {
    formatCode: (
        identity: Identity,
        functionalitySettings: ContractFeatures,
    ) => Promise<string>;
}

type Store = State & Actions;

export const useCodeStore = create<Store>((): Store => {
    return {
        code: initialCode,
        formatCode: async (identity, functionalitySettings) => {
            if (!identity || !functionalitySettings) {
                return '';
            }
            const endLine = '\n    ';
            return initialCode
                .replace('{name}', identity.name)
                .replace('{description}', identity.description)
                .replace(
                    '{mintable}',
                    functionalitySettings.mintable
                        ? `${endLine}mintable_code();`
                        : '',
                )
                .replace(
                    '{burnable}',
                    functionalitySettings.burnable
                        ? `${endLine}burnable_code();`
                        : '',
                )
                .replace(
                    '{pausable}',
                    functionalitySettings.pausable
                        ? `${endLine}pausable_code();`
                        : '',
                )
                .replace(
                    '{roles}',
                    functionalitySettings.roles
                        ? `${endLine}roles_code();`
                        : '',
                );
            // return initialCode;
            // return prettier.format(initialCode, {
            //     parser: "jinx-rust",
            //     plugins: [rustPlugin],
            // });
        },
    };
});
