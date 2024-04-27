import {
    AccountTransactionType,
    CcdAmount,
    ContractName,
    Energy,
    ModuleReference,
    SchemaVersion,
} from '@concordium/web-sdk';
import {
    CONTRACT_NAME,
    MAX_CONTRACT_EXECUTION_ENERGY,
    MODULE_REFERENCE,
    RAW_SCHEMA,
} from '@/shared/config/concordium';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';

export async function contractMint(
    metadataUrl: string,
    amount: number,
    maxSupply: number,
): Promise<string> {
    const provider = await detectConcordiumProvider();
    const accountAddress = await provider.requestAccounts();
    return await provider.sendTransaction(
        accountAddress[0],
        AccountTransactionType.InitContract,
        {
            initName: ContractName.fromString(CONTRACT_NAME),
            amount: CcdAmount.fromCcd(0),
            maxContractExecutionEnergy: Energy.create(
                MAX_CONTRACT_EXECUTION_ENERGY,
            ),
            moduleRef: ModuleReference.fromHexString(MODULE_REFERENCE),
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
        {
            type: 'module',
            value: RAW_SCHEMA,
        },
        SchemaVersion.V1,
    );
}
