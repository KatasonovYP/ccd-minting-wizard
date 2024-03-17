import { useConnectButton } from '../hooks/use-connect-button';
import type { FC } from 'react';
import { Button } from '@/shared/ui/button';
import { useConcordiumApi } from '@/shared/utils/hooks';

export const ConnectButton: FC = () => {
    const { toggleConnection, isConnected } = useConnectButton();
    const { account } = useConcordiumApi();
    return (
        <Button
            onClick={toggleConnection}
            variant={'outline'}
        >
            {isConnected ? account : 'connect'}
        </Button>
    );
};
