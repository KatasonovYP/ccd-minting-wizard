import { WalletConnection } from '@concordium/react-components';
import {
    AccountTransactionType,
    CcdAmount,
    SchemaVersion,
} from '@concordium/web-sdk';
import {
    CONTRACT_NAME,
    MAX_CONTRACT_EXECUTION_ENERGY,
    MODULE_REFERENCE,
    RAW_SCHEMA,
} from '@/shared/config/concordium';

export async function contractMint(
    connection: WalletConnection,
    account: string,
    metadataUrl: string,
    amount: number,
    maxSupply: number,
): Promise<string> {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.InitContract,
        {
            amount: new CcdAmount(BigInt(0)),
            moduleRef: MODULE_REFERENCE,
            initName: CONTRACT_NAME,
            maxContractExecutionEnergy: MAX_CONTRACT_EXECUTION_ENERGY,
        },
        {
            premint_tokens: [
                [
                    '01',
                    [
                        {
                            url: metadataUrl,
                            hash: {
                                None: [],
                            },
                        },
                        {
                            amount: `${amount}`,
                            max_supply: `${maxSupply}`,
                        },
                    ],
                ],
            ],
        },
        RAW_SCHEMA,
        SchemaVersion.V1,
    );
}
