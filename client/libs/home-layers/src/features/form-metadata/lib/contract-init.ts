import {
    AccountTransactionType,
    CcdAmount,
    ContractName,
    ModuleReference,
    Energy,
} from '@concordium/web-sdk';
import type { WalletConnection } from '@concordium/react-components';
import {
    MAX_CONTRACT_EXECUTION_ENERGY,
    MODULE_REFERENCE,
} from '@/shared/config/concordium';
// import { ContractInitParameters } from '../model/contract-init-parameters';

export function contractInit(
    connection: WalletConnection,
    account: string,
    // parameters: ContractInitParameters,
): Promise<string> {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.InitContract,
        {
            amount: CcdAmount.fromCcd(0),
            moduleRef: ModuleReference.fromHexString(MODULE_REFERENCE),
            initName: ContractName.fromString('airdrop_project'),
            maxContractExecutionEnergy: Energy.create(
                MAX_CONTRACT_EXECUTION_ENERGY,
            ),
        },
        // { ...parameters },
    );
}
