import cn from 'classnames';
import { useEffect, useState } from 'react';
import { ConcordiumGRPCWebClient, TransactionHash } from '@concordium/web-sdk';
import cls from './result-content.module.css';
import { Link } from '@/shared/ui/link';
import { Spinner } from '@/shared/ui/spinner';
import { useMintStore } from '@/shared/store/mint-store';
import { MAINNET, TESTNET } from '@concordium/react-components';

interface ResultContentProps {
    hash?: string;
    className?: string;
}

export function ResultContent(props: ResultContentProps) {
    const { className, hash } = props;
    const [address, setAddress] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);
    const isTestNet = useMintStore((state) => state.isTestNet);
    const net = isTestNet ? TESTNET : MAINNET;
    const explorerBaseUrl =  net.ccdScanBaseUrl +'/?dcount=1&dentity=transaction&dhash=';

    useEffect(() => {
        if (!hash) {
            setAddress('no hash');
            return;
        }
        const grpcUrl = isTestNet
            ? 'https://grpc.testnet.concordium.com'
            : 'https://grpc.mainnet.concordium.software/';
        const grpcPort = 20000;
        const client = new ConcordiumGRPCWebClient(
            grpcUrl,
            grpcPort,
            net.grpcOpts,
        );
        client
            .waitForTransactionFinalization(TransactionHash.fromHexString(hash))
            .then((result) =>
                setAddress(
                    // @ts-expect-error contractInitialized actually exists
                    result.summary.contractInitialized.address.index.toString(),
                ),
            )
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [hash]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className={cn(className, cls.resultContent)}>
            <h1>Your contract index is: {`<${address}, 0>`}</h1>
            <Link
                className={cls.link}
                href={explorerBaseUrl + hash}
                target={'_blank'}
            >
                See the transaction details in concordium explorer
            </Link>
        </div>
    );
}
