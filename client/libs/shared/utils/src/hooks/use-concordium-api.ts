import { ConcordiumContextProps, Context } from '@/shared/config/concordium';
import { useContext } from 'react';

export function useConcordiumApi(): ConcordiumContextProps {
	const walletConnectionProps = useContext(
        Context,
	) as ConcordiumContextProps;

	return { ...walletConnectionProps };
}
