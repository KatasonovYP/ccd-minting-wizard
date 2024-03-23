import { useEffect } from 'react';
import { useToggleConnection } from './use-toggle-connection';
import { useConcordiumApi } from '@/shared/utils/hooks';
import { BROWSER_WALLET } from '@/shared/config/concordium';

export function useConnectButton() {
    const { setActiveConnectorType } = useConcordiumApi();
    const { connection } = useConcordiumApi();

    useEffect(
        () => setActiveConnectorType(BROWSER_WALLET),
        [setActiveConnectorType],
    );

    return {
        toggleConnection: useToggleConnection(),
        isConnected: !!connection,
    };
}
