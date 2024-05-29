import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import * as React from 'react';
import { useState } from 'react';
import { Check, LoaderCircle, Upload } from 'lucide-react';
import { postIpfs } from '../form-metadata-file/lib/post-ipfs';
import cls from './form-images.module.css';
import type { FormImagesValues } from './model/form-images-values';
import { InputControlled, InputFile } from '@/shared/ui/input';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { useMintStore } from '@/shared/store/mint-store';

interface FormImagesProps {
    className?: string;
}

const spinnerProps = {
    size: '16',
    className: 'animate-spin',
};

export function FormImages(props: FormImagesProps) {
    const { className } = props;

    const [displayImage, setDisplayImage] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState('');
    const setDisplay = useMintStore((state) => state.setDisplay);
    const setThumbnail = useMintStore((state) => state.setThumbnail);
    const savedDisplay = useMintStore((state) => !!state.display.display?.url);
    const savedThumbnail = useMintStore(
        (state) => !!state.thumbnail.thumbnail?.url,
    );
    const display = useMintStore((state) => state.display);
    const thumbnail = useMintStore((state) => state.thumbnail);
    const [isUrlDisplay, setIsUrlDisplay] = useState(!!display.display?.url);
    const [isUrlThumbnail, setIsUrlThumbnail] = useState(
        !!thumbnail.thumbnail?.url,
    );
    const [isDisplayLoading, setIsDisplayLoading] = useState(false);
    const [isThumbnailLoading, setIsThumbnailLoading] = useState(false);
    const isFileLoaded = useMintStore((state) => state.isFileLoaded);

    const { register, control, handleSubmit } = useForm<FormImagesValues>({
        values: {
            'url usage display': display.display?.url ? true : isUrlDisplay,
            'url usage thumbnail': thumbnail.thumbnail?.url
                ? true
                : isUrlThumbnail,
            'file display': undefined,
            'url display': display.display?.url || '',
            'file thumbnail': undefined,
            'url thumbnail': thumbnail.thumbnail?.url || '',
        },
    });

    function readFileImage(blob: Blob, set: (buffer: string) => void) {
        const onLoadEnd = (event: ProgressEvent<FileReader>) => {
            const buffer = event.target?.result;
            if (typeof buffer !== 'string') return;
            set(buffer);
        };

        const metadataReader = new FileReader();
        metadataReader.onloadend = onLoadEnd;
        metadataReader.readAsDataURL(blob);
    }

    async function onAction(data: FormImagesValues) {
        setIsUrlDisplay(data['url usage display']);
        setIsUrlThumbnail(data['url usage thumbnail']);

        if (!data['url usage display'] && data['file display']?.length) {
            setIsDisplayLoading(true);
            try {
                readFileImage(data['file display'][0], setDisplayImage);
                const ipfsUrl = await postIpfs(data['file display'][0]);
                setDisplay({ display: { url: ipfsUrl } });
            } finally {
                setIsDisplayLoading(false);
            }
        } else {
            setDisplay({ display: { url: data['url display'] } });
        }

        if (!data['url usage thumbnail'] && data['file thumbnail']?.length) {
            setIsThumbnailLoading(true);
            try {
                readFileImage(data['file thumbnail'][0], setThumbnailImage);
                const ipfsUrl = await postIpfs(data['file thumbnail'][0]);
                setThumbnail({ thumbnail: { url: ipfsUrl } });
            } finally {
                setIsThumbnailLoading(false);
            }
        } else {
            setThumbnail({ thumbnail: { url: data['url thumbnail'] } });
        }
    }

    return (
        <form
            className={cn(className, cls.formImages, 'flex gap-4')}
            onChange={handleSubmit(onAction)}
        >
            <Dialog>
                <DialogTrigger
                    asChild
                    type='button'
                >
                    <Button
                        className={'flex gap-2'}
                        variant={'outline'}
                        disabled={isDisplayLoading || isFileLoaded}
                    >
                        Add Display{' '}
                        {isDisplayLoading ? (
                            <LoaderCircle {...spinnerProps} />
                        ) : savedDisplay ? (
                            <Check size={16} />
                        ) : (
                            <Upload size={16} />
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Display</DialogTitle>
                        <DialogDescription>
                            Make changes to your display. Click save when you're
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex items-start justify-between gap-4'>
                        <div className='flex flex-col gap-4'>
                            <Controller
                                control={control}
                                name={'url usage display'}
                                render={({
                                    field: { onChange, value, name, ref },
                                }) => (
                                    <div className='flex items-center gap-4'>
                                        <Label
                                            className='cursor-pointer text-sm capitalize'
                                            htmlFor={`switch-${name}`}
                                        >
                                            {name}
                                        </Label>
                                        <Switch
                                            ref={ref}
                                            id={`switch-${name}`}
                                            checked={value}
                                            onCheckedChange={(event) => {
                                                onChange(event);
                                                handleSubmit(onAction)();
                                            }}
                                        />
                                    </div>
                                )}
                            />
                            {isUrlDisplay ? (
                                <InputControlled
                                    control={control}
                                    name={'url display'}
                                />
                            ) : (
                                <InputFile
                                    className={'max-w-[180px]'}
                                    accept='.png,.jpg,.jpeg,.ico'
                                    formReg={register('file display')}
                                />
                            )}
                        </div>
                        <Avatar className={cn(cls.tokenAvatar, 'h-64 w-64')}>
                            <AvatarImage
                                src={displayImage}
                                alt={'image'}
                            />
                            <AvatarFallback>no display chosen</AvatarFallback>
                        </Avatar>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button'>Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger
                    asChild
                    type='button'
                >
                    <Button
                        className='flex gap-2'
                        variant={'outline'}
                        disabled={isThumbnailLoading || isFileLoaded}
                    >
                        Add Thumbnail{' '}
                        {isThumbnailLoading ? (
                            <LoaderCircle {...spinnerProps} />
                        ) : savedThumbnail ? (
                            <Check size={16} />
                        ) : (
                            <Upload size={16} />
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thumbnail</DialogTitle>
                        <DialogDescription>
                            Make changes to your thumbnail. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-4'>
                            <Controller
                                control={control}
                                name={'url usage thumbnail'}
                                render={({
                                    field: { onChange, value, name, ref },
                                }) => (
                                    <div className='flex items-center gap-4'>
                                        <Switch
                                            ref={ref}
                                            id={`switch-${name}`}
                                            checked={value}
                                            onCheckedChange={(event) => {
                                                onChange(event);
                                                handleSubmit(onAction)();
                                            }}
                                        />
                                        <Label
                                            className='cursor-pointer text-sm capitalize'
                                            htmlFor={`switch-${name}`}
                                        >
                                            {name}
                                        </Label>
                                    </div>
                                )}
                            />
                            {isUrlThumbnail ? (
                                <InputControlled
                                    control={control}
                                    name={'url thumbnail'}
                                />
                            ) : (
                                <InputFile
                                    accept='.png,.jpg,.jpeg,.ico'
                                    formReg={register('file thumbnail')}
                                    className={'max-w-[180px]'}
                                />
                            )}
                        </div>
                        <Avatar className={cn(cls.tokenAvatar, 'h-8 w-8')}>
                            <AvatarImage
                                src={thumbnailImage}
                                alt={'image'}
                            />
                            <AvatarFallback>no thumbnail chosen</AvatarFallback>
                        </Avatar>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button'>Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    );
}
