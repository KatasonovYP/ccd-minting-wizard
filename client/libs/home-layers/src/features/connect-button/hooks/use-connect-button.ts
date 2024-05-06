import { useEffect } from 'react';
import { useToggleConnection } from './use-toggle-connection';
import { useConcordiumApi } from '@/shared/utils/hooks';
import { BROWSER_WALLET } from '@/shared/config/concordium';
import { useMintStore } from '@/shared/store/mint-store';

export function useConnectButton() {
    const { connection } = useConcordiumApi();
    const { setActiveConnectorType } = useConcordiumApi();
    const isTestNet = useMintStore((state) => state.isTestNet);

    useEffect(() => {
        connection?.disconnect();
        setActiveConnectorType(BROWSER_WALLET);
    }, [setActiveConnectorType, isTestNet]);

    return {
        toggleConnection: useToggleConnection(),
        isConnected: !!connection,
    };
}
