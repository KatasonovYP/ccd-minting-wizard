import { useMintStore } from '../../../store/src/mint-store';
import { useEffect, useState } from 'react';
import { useCodeStore } from '../../../store/src/code-store';

export function useCode() {
    const identity = useMintStore((state) => state.identity);
    const functionalitySettings = useMintStore(
        (state) => state.contractFeatures,
    );
    const [code, setCode] = useState<string>('');
    const formatCode = useCodeStore((state) => state.formatCode);

    useEffect(() => {
        formatCode(identity, functionalitySettings).then(setCode);
    }, [identity, functionalitySettings, formatCode]);
    return { code };
}
