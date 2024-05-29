import cn from 'classnames';
import { useState } from 'react';
import { postIpfs } from '../form-metadata-file/lib/post-ipfs';
import { ResultContent } from '../../entities/result-content/result-content';
import cls from './deploy-contract.module.css';
import { Button } from '@/shared/ui/button';
import { useAuth, useCode } from '@/shared/utils/hooks';
import { contractMint } from '@/shared/utils/smart-contract';
import { useBlobMetadata } from '@/shared/utils/hooks/use-blob-metadata';
import { useMintStore } from '@/shared/store/mint-store';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

interface DeployContractProps {
    className?: string;
}

export function DeployContract(props: DeployContractProps) {
    const { className } = props;
    const { isAuth } = useAuth();
    const { metadata } = useBlobMetadata();
    const mintingSettings = useMintStore((state) => state.mintingSettings);
    const { name, schema, reference } = useCode();
    const [hash, setHash] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);

    async function handleClick() {
        setHash(undefined);
        try {
            if (!reference || !schema) {
                console.error('reference', reference);
                console.error('schema', schema);
                console.error('no schema or reference');
                return;
            }
            const metadataUrl = await postIpfs(metadata);
            const hash = await contractMint(
                schema,
                reference,
                name,
                metadataUrl,
                mintingSettings.premint || 0,
                mintingSettings['maximum tokens'] || 100,
            );
            setHash(hash);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={cn(className, cls.deployContract)}>
            <Popover onOpenChange={(open) => setIsOpen(open)}>
                <PopoverTrigger asChild>
                    <Button
                        disabled={!isAuth || isOpen}
                        onClick={handleClick}
                        className={'min-w-[80px]'}
                    >
                        Deploy
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align='end'
                    className={'w-80'}
                >
                    <ResultContent hash={hash} />
                </PopoverContent>
            </Popover>
        </div>
    );
}
