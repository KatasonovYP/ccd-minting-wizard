import { useState } from 'react';
import { useContractFeaturesCode } from './use-contract-features-code';

const SMART_CONTRACT_PATH = './processed';

export function useCode() {
    const contractFeaturesCode = useContractFeaturesCode();

    const [code, setCode] = useState<string>();
    const [reference, setReference] = useState<string>();
    const [schema, setSchema] = useState<string>();

    import(`./processed/${contractFeaturesCode}/src/lib.rs`).then(
        (lib) => {
            setCode(lib.plainText.trim());
        },
    );

    import(`./processed/${contractFeaturesCode}/reference.text`).then(
        (lib) => {
            setReference(lib.plainText.trim());
        },
    );

    import(
        `./processed/${contractFeaturesCode}/dist/schemab64.text`
    ).then((lib) => {
        setSchema(lib.plainText.trim());
    });

    return { code, reference, schema, name: `mint_wizard_${contractFeaturesCode}` };
}
