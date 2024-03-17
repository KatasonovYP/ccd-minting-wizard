import { useConcordiumApi } from './use-concordium-api';

export function useAuth() {
	const { account } = useConcordiumApi();

	return {
		isAuth: !!account,
	};
}
