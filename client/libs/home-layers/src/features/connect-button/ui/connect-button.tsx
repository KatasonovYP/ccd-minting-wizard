import { useConnectButton } from '../hooks/use-connect-button';
import { Button } from '@/shared/ui/button';
import { useConcordiumApi } from '@/shared/utils/hooks';

export function ConnectButton() {
    const { toggleConnection, isConnected } = useConnectButton();
    const { account } = useConcordiumApi();
    const accountPreview = `${account?.slice(0, 4)}...${account?.slice(-4   )}`;
    return (
        <Button
            onClick={toggleConnection}
            variant={'outline'}
            className="min-w-[120px]"
        >
            {isConnected ? accountPreview : 'Connect'}
        </Button>
    );
}
