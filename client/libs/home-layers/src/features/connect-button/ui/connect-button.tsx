import { useConnectButton } from '../hooks/use-connect-button';
import { Button } from '@/shared/ui/button';
import { useConcordiumApi } from '@/shared/utils/hooks';

export function ConnectButton() {
    const { toggleConnection, isConnected } = useConnectButton();
    const { account } = useConcordiumApi();
    return (
        <Button
            onClick={toggleConnection}
            variant={'outline'}
        >
            {isConnected ? account : 'Connect'}
        </Button>
    );
}
