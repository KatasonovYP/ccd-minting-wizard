import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { Trash2 } from 'lucide-react';
import { readFileJson } from '../lib/read-file-json';
import type { SubmitHandler } from 'react-hook-form';
import type { FormMetadataFileValues } from '../model/form-metadata-file-values';
import { InputFile } from '@/shared/ui/input';
import { useMintStore } from '@/shared/store/mint-store';
import { Button } from '@/shared/ui/button';

interface FormMetadataProps {
    className?: string;
}

export function FormMetadataFile(props: FormMetadataProps) {
    const { className } = props;

    const setIdentity = useMintStore((store) => store.setIdentity);
    const setOptionalFields = useMintStore((store) => store.setOptionalFields);
    const setAttributes = useMintStore((store) => store.setAttributes);
    const setDisplay = useMintStore((store) => store.setDisplay);
    const setThumbnail = useMintStore((store) => store.setThumbnail);
    const setIsFileLoaded = useMintStore((store) => store.setIsFileLoaded);
    const isFileLoaded = useMintStore((store) => store.isFileLoaded);
    const setMetadataFile = useMintStore((store) => store.setMetadataFile)!;
    const metadataFile = useMintStore((store) => store.metadataFile);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        resetField,
    } = useForm<FormMetadataFileValues>({
        values: { metadata: metadataFile },
    });

    const onAction: SubmitHandler<FormMetadataFileValues> = async (
        data,
    ): Promise<void> => {
        setMetadataFile(data.metadata);
        const { metadata } = data;
        if (!metadata) return;
        try {
            readFileJson(
                metadata[0],
                [
                    setIdentity,
                    setOptionalFields,
                    setAttributes,
                    setDisplay,
                    setThumbnail,
                ],
                setError,
            );
            setIsFileLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, 'flex items-center justify-between')}
        >
            <InputFile
                className={'max-w-[180px]'}
                accept='.json'
                error={errors.metadata}
                formReg={register('metadata')}
            />
            <Button
                variant={'ghost'}
                size={'icon'}
                onClick={(event) => {
                    event.preventDefault();
                    resetField('metadata');
                    setIsFileLoaded(false);
                }}
                className={'hover:text-red-600'}
            >
                {isFileLoaded && <Trash2 size={20} />}
            </Button>
        </form>
    );
}
