import { useEffect } from 'react';
import { useToggleConnection } from './use-toggle-connection';
import { useConcordiumApi } from '@/shared/utils/hooks';
import { BROWSER_WALLET } from '@/shared/config/concordium';

export function useConnectButton() {
    const { setActiveConnectorType, account } = useConcordiumApi();
    const { connection, activeConnector } = useConcordiumApi();

    useEffect(() => setActiveConnectorType(BROWSER_WALLET), []);

    return {
        toggleConnection: useToggleConnection(),
        isConnected: !!connection,
    };
}
