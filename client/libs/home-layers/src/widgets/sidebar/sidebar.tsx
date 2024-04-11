import cn from 'classnames';
import cls from './sidebar.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { FormIdentity } from '@/home/features/form-identity';
import { FormMintingSettings } from '@/home/features/form-minting-settings';
import { FormFunctionalitySettings } from '@/home/features/form-functionality-settings';
import { FormMetadataFile } from '@/home/features/form-metadata-file';
import { FormMetadataOptional } from '@/home/features/form-metadata-optional';
import { FormAttributes } from '@/home/features/form-attributes';
import { FormAssets } from '@/home/features/form-assets';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { FormImages } from '@/home/features/form-images';

interface SidebarProps {
    className?: string;
}

export function Sidebar(props: SidebarProps) {
    const { className } = props;

    return (
        <ScrollArea
            className={cn(
                className,
                cls.sidebar,
                'rounded-md bg-white p-4 shadow-md',
            )}
        >
            <Tabs
                defaultValue='basic'
                className={cn('')}
            >
                <TabsList className='grid w-full grid-cols-2 mb-8'>
                    <TabsTrigger value='basic'>Basic</TabsTrigger>
                    <TabsTrigger value='advanced'>Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value='basic'>
                    <FormIdentity />
                    <FormImages className={'mb-4'} />
                    <FormMintingSettings />
                    <FormFunctionalitySettings />
                    <FormMetadataOptional />
                </TabsContent>
                <TabsContent value='advanced'>
                    <FormMetadataFile />
                    <FormIdentity />
                    <FormMintingSettings />
                    <FormFunctionalitySettings />
                    <FormMetadataOptional />
                    <FormAttributes className='mb-4' />
                    <FormAssets />
                </TabsContent>
            </Tabs>
        </ScrollArea>
    );
}