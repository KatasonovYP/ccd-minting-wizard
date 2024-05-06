import {
    MAINNET,
    TESTNET,
    WithWalletConnector,
} from '@concordium/react-components';
import { ConcordiumContextProvider } from './concordium-context-provider';
import type { PropsWithChildren } from 'react';
import { useMintStore } from '@/shared/store/mint-store';

export function ConcordiumProvider({ children }: PropsWithChildren) {
    const isTestNet = useMintStore((state) => state.isTestNet);
    return (
        <WithWalletConnector network={isTestNet ? TESTNET : MAINNET}>
            {(props) => {
                return (
                    <ConcordiumContextProvider
                        walletConnectionPropsDefault={props}
                    >
                        {children}
                    </ConcordiumContextProvider>
                );
            }}
        </WithWalletConnector>
    );
}
