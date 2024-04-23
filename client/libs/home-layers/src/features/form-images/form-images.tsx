import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import * as React from 'react';
import { useState } from 'react';
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

export function FormImages(props: FormImagesProps) {
    const { className } = props;

    const [image, setImage] = useState('');
    const setDisplay = useMintStore((state) => state.setDisplay);
    const setThumbnail = useMintStore((state) => state.setThumbnail);
    const display = useMintStore((state) => state.display);
    const thumbnail = useMintStore((state) => state.thumbnail);
    const [isUrlDisplay, setIsUrlDisplay] = useState(!!display.display?.url);
    const [isUrlThumbnail, setIsUrlThumbnail] = useState(
        !!thumbnail.thumbnail?.url,
    );

    const { register, control, handleSubmit, watch, getValues } =
        useForm<FormImagesValues>({
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

    function readFileImage(blob: Blob) {
        const onLoadEnd = (event: ProgressEvent<FileReader>) => {
            const buffer = event.target?.result;
            if (typeof buffer !== 'string') return;
            setImage(buffer);
        };

        const metadataReader = new FileReader();
        metadataReader.onloadend = onLoadEnd;
        metadataReader.readAsDataURL(blob);
    }

    async function onAction(data: FormImagesValues) {
        console.log(data);
        setIsUrlDisplay(data['url usage display']);
        if (!data['url usage display'] && data['file display']?.length) {
            readFileImage(data['file display'][0]);
            const ipfsUrl = await postIpfs(data['file display'][0]);
            setDisplay({ display: { url: ipfsUrl } });
        } else {
            setDisplay({ display: { url: data['url display'] } });
        }
        if (!data['url usage thumbnail'] && data['file thumbnail']?.length) {
            readFileImage(data['file thumbnail'][0]);
            const ipfsUrl = await postIpfs(data['file thumbnail'][0]);
            setThumbnail({ thumbnail: { url: ipfsUrl } });
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
                    <Button>add display</Button>
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
                                    accept='.png,.jpg,.jpeg,.ico'
                                    formReg={register('file display')}
                                />
                            )}
                        </div>
                        <Avatar className={cn(cls.tokenAvatar, 'h-64 w-64')}>
                            <AvatarImage
                                src={image}
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
                    <Button>add thumbnail</Button>
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
                            {isUrlDisplay ? (
                                <InputControlled
                                    control={control}
                                    name={'url thumbnail'}
                                />
                            ) : (
                                <InputFile
                                    accept='.png,.jpg,.jpeg,.ico'
                                    formReg={register('file thumbnail')}
                                />
                            )}
                        </div>
                        <Avatar className={cn(cls.tokenAvatar, 'h-8 w-8')}>
                            <AvatarImage
                                src={image}
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
