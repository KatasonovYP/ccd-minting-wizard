import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { Trash2 } from 'lucide-react';
import { readFileJson } from '../lib/read-file-json';
import type { FormMetadataFileValues } from '../model/form-metadata-file-values';
import { Input } from '@/shared/ui/input';
import { useMintStore } from '@/shared/store/mint-store';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Hint } from '@/shared/ui/hint';
import { ErrorMessage } from '@/shared/ui/error-message';
import * as React from 'react';

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
    const reset = useMintStore((store) => store.reset);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        resetField,
    } = useForm<FormMetadataFileValues>({
        values: {},
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

    const name = 'metadata';

    return (
        <form
            onChange={handleSubmit(onAction)}
            className={cn(className, 'mb-4 flex flex-col gap-1')}
        >
            <div className='flex items-center justify-between gap-6'>
                <Label
                    className={
                        'flex cursor-pointer items-center justify-between capitalize'
                    }
                    htmlFor={name}
                >
                    {name}
                </Label>
                <Input
                    type='file'
                    id={name}
                    className={cn(className, 'w-full')}
                    accept='.json'
                    disabled={isFileLoaded}
                    {...register('metadata')}
                />
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={(event) => {
                        event.preventDefault();
                        resetField('metadata');
                        reset();
                        setIsFileLoaded(false);
                    }}
                    className={'hover:text-red-600'}
                    disabled={!isFileLoaded}
                >
                    <Trash2 size={20} />
                </Button>
                <Hint name={name} />
            </div>
            {errors.metadata && (
                <ErrorMessage message={errors.metadata?.message} />
            )}
        </form>
    );
}
