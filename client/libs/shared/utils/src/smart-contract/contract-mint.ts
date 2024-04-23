import { WalletConnection } from '@concordium/react-components';
import { AccountTransactionType, CcdAmount } from '@concordium/web-sdk';
import { CONTRACT_NAME, MAX_CONTRACT_EXECUTION_ENERGY, RAW_SCHEMA } from '@/shared/config/concordium';

export async function contractMint(
    connection: WalletConnection,
    account: string,
    index: number,
): Promise<string> {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: new CcdAmount(BigInt(0)),
            address: {
                index: BigInt(index),
                subindex: BigInt(0),
            },
            receiveName: `${CONTRACT_NAME}.mint`,
            maxContractExecutionEnergy: MAX_CONTRACT_EXECUTION_ENERGY,
        },
        {
            owner: {
                Account: [account],
            },
            tokens: [[
                '22',
                [
                    {
                        url: 'https://moccasin-lovely-unicorn-304.mypinata.cloud/ipfs/QmdopfNTweiJu7UtGKhwHyvTAkMJb6zat8DtSvEZpPvXFN',
                        hash: {
                            None: [],
                        },
                    },
                    {
                        amount: '1',
                        max_supply: '100',
                    },
                ],
            ]],
        },
        RAW_SCHEMA,
    );
}
