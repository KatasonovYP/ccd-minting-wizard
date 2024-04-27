import { WithWalletConnector, TESTNET } from '@concordium/react-components';
import { ConcordiumContextProvider } from './concordium-context-provider';
import type { PropsWithChildren } from 'react';

export function ConcordiumProvider({ children }: PropsWithChildren) {
    return (
        <WithWalletConnector network={TESTNET}>
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
