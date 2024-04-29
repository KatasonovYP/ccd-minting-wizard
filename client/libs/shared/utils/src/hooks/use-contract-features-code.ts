import { useMintStore } from '@/shared/store/mint-store';

export function useContractFeaturesCode() {
    const contractFeatures = useMintStore((state) => state.contractFeatures);
    return Object.values(contractFeatures).map(Number).join('');
}
