import { useEffect, useState } from 'react';
import { useContractFeaturesCode } from './use-contract-features-code';

export function useCode() {
    const contractFeaturesCode = useContractFeaturesCode();

    const [code, setCode] = useState<string>();
    const [reference, setReference] = useState<string>();
    const [schema, setSchema] = useState<string>();

    useEffect(() => {
        import(`./processed/${contractFeaturesCode}/src/lib.rs`)
            .then((lib) => setCode(lib.plainText.trim()))
            .catch(console.error);

        import(`./processed/${contractFeaturesCode}/reference.module`)
            .then((lib) => setReference(lib.plainText.trim()))
            .catch(console.error);

        import(`./processed/${contractFeaturesCode}/dist/schemab64.schema`)
            .then((lib) => setSchema(lib.plainText.trim()))
            .catch(console.error);
    }, [contractFeaturesCode]);

    return {
        name: `mint_wizard_${contractFeaturesCode}_V3`,
        code,
        reference,
        schema,
    };
}
