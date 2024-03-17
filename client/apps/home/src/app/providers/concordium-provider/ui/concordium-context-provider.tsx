import { useConcordiumProps } from '../hooks/use-concordium-props';
import type { ReactNode } from 'react';
import type { WalletConnectionProps } from '@concordium/react-components/dist/WithWalletConnector';
import { Context } from '@/shared/config/concordium';

interface ConcordiumProviderProps {
    walletConnectionPropsDefault: WalletConnectionProps;
    children: ReactNode;
}

export function ConcordiumContextProvider(props: ConcordiumProviderProps) {
    const { walletConnectionPropsDefault, children } = props;
    const defaultProps = useConcordiumProps(walletConnectionPropsDefault);

    return (
        <Context.Provider value={{ ...defaultProps }}>
            {children}
        </Context.Provider>
    );
}
