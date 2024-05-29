import { useEffect, useState } from 'react';
import { useContractFeaturesCode } from './use-contract-features-code';
import { useMintStore } from '@/shared/store/mint-store';

export function useCode() {
    const contractFeaturesCode = useContractFeaturesCode();
    const isTestNet = useMintStore((state) => state.isTestNet);
    const net = isTestNet ? 'testnet' : 'mainnet';
    const version = isTestNet ? 'V3' : 'V3';

    const [code, setCode] = useState<string>();
    const [reference, setReference] = useState<string>();
    const [schema, setSchema] = useState<string>();

    useEffect(() => {
        console.log(`texts changed to ${net}`);
        import(`./${net}/${contractFeaturesCode}/src/lib.rs`)
            .then((lib) => setCode(lib.plainText.trim()))
            .catch(console.error);

        import(`./${net}/${contractFeaturesCode}/reference.module`)
            .then((lib) => setReference(lib.plainText.trim()))
            .catch(console.error);

        import(`./${net}/${contractFeaturesCode}/dist/schemab64.schema`)
            .then((lib) => setSchema(lib.plainText.trim()))
            .catch(console.error);
    }, [contractFeaturesCode, isTestNet]);

    return {
        name: `mint_wizard_${contractFeaturesCode}_${version}`,
        code,
        reference,
        schema,
    };
}
