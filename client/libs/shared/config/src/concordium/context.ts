import { createContext } from 'react';
import type { WalletConnectionProps } from '@concordium/react-components/dist/WithWalletConnector';
import type { Connection } from '@concordium/react-components/dist/useConnection';
import type { Connect } from '@concordium/react-components';

export type ConcordiumContextProps = WalletConnectionProps &
    Connection &
    Connect;

export const Context = createContext<Partial<ConcordiumContextProps>>({});
