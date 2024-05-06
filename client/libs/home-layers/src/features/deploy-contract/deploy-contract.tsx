import cn from 'classnames';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { postIpfs } from '../form-metadata-file/lib/post-ipfs';
import cls from './deploy-contract.module.css';
import { Button } from '@/shared/ui/button';
import { useAuth, useCode } from '@/shared/utils/hooks';
import { contractMint } from '@/shared/utils/smart-contract';
import { useMetadata } from '@/shared/utils/hooks/use-metadata';
import { useMintStore } from '@/shared/store/mint-store';

interface DeployContractProps {
    className?: string;
}

export function DeployContract(props: DeployContractProps) {
    const { className } = props;
    const { isAuth } = useAuth();
    const { metadata } = useMetadata();
    const mintingSettings = useMintStore((state) => state.mintingSettings);
    const { name, schema, reference } = useCode();
    const [isDeploying, setIsDeploying] = useState(false);
    const navigate = useNavigate();

    async function handleClick() {
        setIsDeploying(true);
        try {
            if (!reference || !schema) {
                console.warn('reference', reference);
                console.warn('schema', schema);
                console.error('no schema or reference');
                return;
            }
            console.log(reference);
            const metadataUrl = await postIpfs(metadata);
            const hash = await contractMint(
                schema,
                reference,
                name,
                metadataUrl,
                mintingSettings.premint || 0,
                mintingSettings['maximum tokens'] || 100,
            );
            navigate(`result?hash=${hash}`);
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
                {isDeploying ? (
                    <LoaderCircle
                        size={'24'}
                        className={'animate-spin'}
                    />
                ) : (
                    'Deploy'
                )}
            </Button>
        </div>
    );
}
