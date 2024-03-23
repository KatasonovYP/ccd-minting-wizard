import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { fileRead } from '../lib/file-read';
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

    const onAction: SubmitHandler<FormMetadataFileValues> = async (
        data,
    ): Promise<void> => {
        try {
            fileRead(
                data.metadata[0],
                [setIdentity, setOptionalFields, setAttributes],
                setError,
            );
            // console.log(await postIpfs(data.metadata[0]));
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
                type='file'
                accept='.json'
                error={errors.metadata}
                formReg={register('metadata')}
            />
        </form>
    );
}
