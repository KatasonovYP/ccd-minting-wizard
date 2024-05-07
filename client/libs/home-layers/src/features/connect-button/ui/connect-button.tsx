import { useEffect } from 'react';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import { useConnectButton } from '../hooks/use-connect-button';
import { Button } from '@/shared/ui/button';
import { useConcordiumApi } from '@/shared/utils/hooks';

export function ConnectButton() {
    const { toggleConnection, isConnected } = useConnectButton();
    const { account, connect } = useConcordiumApi();
    const accountPreview = `${account?.slice(0, 4)}...${account?.slice(-4)}`;

    useEffect(() => {
        if (!connect) return;
        detectConcordiumProvider().then(async (provider) => {
            const isAllowed =
                !!(await provider.getMostRecentlySelectedAccount());
            if (isAllowed) {
                connect();
            }
        });
    }, [connect]);

    return (
        <Button
            onClick={toggleConnection}
            variant={'outline'}
            className='min-w-[120px]'
        >
            {isConnected ? accountPreview : 'Connect'}
        </Button>
    );
}
