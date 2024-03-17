import { useConnect, useConnection } from '@concordium/react-components';
import { useMemo } from 'react';
import type { WalletConnectionProps } from '@concordium/react-components';
import type { ConcordiumContextProps } from '@/shared/config/concordium';

export function useConcordiumProps(
    walletConnectionPropsDefault: WalletConnectionProps,
): ConcordiumContextProps {
    const { connectedAccounts, genesisHashes, activeConnector } =
        walletConnectionPropsDefault;

    const connection = useConnection(connectedAccounts, genesisHashes);

    const connect = useConnect(activeConnector, connection.setConnection);

    return useMemo(
        (): ConcordiumContextProps => ({
            ...walletConnectionPropsDefault,
            ...connection,
            ...connect,
        }),

        [walletConnectionPropsDefault, connection, connect],
    );
}
