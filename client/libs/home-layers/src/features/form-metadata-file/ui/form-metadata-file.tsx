import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { readFileJson } from '../lib/read-file-json';
import { postIpfs } from '../lib/post-ipfs';
import type { SubmitHandler } from 'react-hook-form';
import type { FormMetadataFileValues } from '../model/form-metadata-file-values';
import { InputFile } from '@/shared/ui/input';
import { useMintStore } from '@/shared/store/mint-store';

interface FormMetadataProps {
    className?: string;
}

export function FormMetadataFile(props: FormMetadataProps) {
    const { className } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormMetadataFileValues>();

    const setIdentity = useMintStore((store) => store.setIdentity);
    const setOptionalFields = useMintStore((store) => store.setOptionalFields);
    const setAttributes = useMintStore((store) => store.setAttributes);
    const setAssets = useMintStore((store) => store.setAssets);

    const onAction: SubmitHandler<FormMetadataFileValues> = async (
        data,
    ): Promise<void> => {
        try {
            readFileJson(
                data.metadata[0],
                [setIdentity, setOptionalFields, setAttributes, setAssets],
                setError,
            );
            console.log(await postIpfs(data.metadata[0]));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className)}
        >
            <InputFile
                accept='.json'
                error={errors.metadata}
                formReg={register('metadata')}
            />
        </form>
    );
}
