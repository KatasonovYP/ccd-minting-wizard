import cn from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ConcordiumGRPCWebClient, TransactionHash } from '@concordium/web-sdk';
import cls from './result-page.module.css';
import { Link } from '@/shared/ui/link';
import { Button } from '@/shared/ui/button';
import { staticRoutes } from '@/shared/config/const';
import { Spinner } from '@/shared/ui/spinner';

interface ResultPageProps {
    className?: string;
}

const explorerBaseUrl =
    'https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=';

export function ResultPage(props: ResultPageProps) {
    const { className } = props;
    const [searchParams] = useSearchParams();
    const [address, setAddress] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const hash = searchParams.get('hash');

    useEffect(() => {
        if (!hash) {
            setAddress('no hash');
        }
        const grpcUrl = 'https://grpc.testnet.concordium.com';
        const grpcPort = 20000;
        const client = new ConcordiumGRPCWebClient(grpcUrl, grpcPort);
        client
            .waitForTransactionFinalization(
                TransactionHash.fromHexString(hash!),
            )
            .then((result) =>
                setAddress(
                    // @ts-expect-error contractInitialized actually exists
                    result.summary.contractInitialized.address.index.toString(),
                ),
            )
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={cn(className, cls.resultPage)}>
            <h1>Your contract index is: {`<${address}, 0>`}</h1>
            <Link
                className={cls.link}
                href={explorerBaseUrl + hash}
                target={'_blank'}
            >
                See the transaction details in ccd explorer
            </Link>
            <Button onClick={() => navigate(staticRoutes.main)}>
                Mint a new token
            </Button>
        </div>
    );
}
