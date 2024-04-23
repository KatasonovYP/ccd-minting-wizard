import cn from 'classnames';
import cls from './deploy-contract.module.css';
import { Button } from '@/shared/ui/button';
import { useAuth, useConcordiumApi } from '@/shared/utils/hooks';
import { contractMint } from '@/shared/utils/smart-contract';
import { postIpfs } from '../form-metadata-file/lib/post-ipfs';
import { useMetadata } from '@/shared/utils/hooks/use-metadata';
import { useMintStore } from '@/shared/store/mint-store';
import { useState } from 'react';
import { Loader, LoaderCircle } from 'lucide-react';

interface DeployContractProps {
    className?: string;
}

const explorerBaseUrl =
    'https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=';

export function DeployContract(props: DeployContractProps) {
    const { className } = props;
    const { connection, account } = useConcordiumApi();
    const { isAuth } = useAuth();
    const { metadata } = useMetadata();
    const mintingSettings = useMintStore((state) => state.mintingSettings);
    const [isDeploying, setIsDeploying] = useState(false);

    async function handleClick() {
        setIsDeploying(true);
        try {
            const metadataUrl = await postIpfs(metadata);
            console.log(metadataUrl);
            const result = await contractMint(
                connection!,
                account!,
                metadataUrl,
                mintingSettings.premint || 0,
                mintingSettings['maximum tokens'] || 100,
            );
            console.log(explorerBaseUrl + result, result);
        } finally {
            setIsDeploying(false);
        }
    }

    return (
        <div className={cn(className, cls.deployContract)}>
            <Button
                disabled={!isAuth}
                onClick={handleClick}
                className={'min-w-[80px]'}
            >
                {isDeploying ? <LoaderCircle size={'24'} className={'animate-spin'} /> : 'Deploy'}
            </Button>
        </div>
    );
}
