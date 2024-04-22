import cn from 'classnames';
import cls from './deploy-contract.module.css';
import { Button } from '@/shared/ui/button';
import { useConcordiumApi } from '@/shared/utils/hooks';
import { contractMint } from '@/shared/utils/smart-contract';

interface DeployContractProps {
    className?: string;
}


const explorerBaseUrl = 'https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=';

export function DeployContract(props: DeployContractProps) {
    const { className } = props;
    const { connection, account } = useConcordiumApi();

    async function handleClick() {
        if (!account) {
            console.error('no account');
            return;
        }
        const result = await contractMint(connection!, account, 8625);
        console.log(explorerBaseUrl + result, result);
    }

    return (
        <div className={cn(className, cls.deployContract)}>
            <Button onClick={handleClick}>Deploy</Button>
        </div>
    );
}
