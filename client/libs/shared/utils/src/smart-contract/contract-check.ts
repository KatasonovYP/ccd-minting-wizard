import { WalletConnection } from '@concordium/react-components';
import { CONTRACT_NAME } from '@/shared/config/concordium';

export async function contractCheck(connection: WalletConnection, hash: string) {
    // return await connection.client.grpcClient.healthClient.methods[0]

    // return decodeView((encodedView as any).returnValue);
}
