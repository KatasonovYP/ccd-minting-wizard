import { useState } from 'react';
import { useContractFeaturesCode } from './use-contract-features-code';

const SMART_CONTRACT_PATH = '../../../assets/src/processed';

export function useCode() {
    const contractFeaturesCode = useContractFeaturesCode();

    const [code, setCode] = useState<string>();
    const [reference, setReference] = useState<string>();
    const [schema, setSchema] = useState<string>();

    import(`${SMART_CONTRACT_PATH}/${contractFeaturesCode}/src/lib.rs`).then(
        (lib) => {
            setCode(lib.plainText);
        },
    );

    import(`${SMART_CONTRACT_PATH}/${contractFeaturesCode}/reference.text`).then(
        (lib) => {
            setReference(lib.plainText);
        },
    );

    import(
        `${SMART_CONTRACT_PATH}/${contractFeaturesCode}/dist/schemab64.text`
    ).then((lib) => {
        setSchema(lib.plainText);
    });

    return { code, reference, schema, name: `mint_wizard_${contractFeaturesCode}` };
}
