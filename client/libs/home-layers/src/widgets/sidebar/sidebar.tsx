import cn from 'classnames';
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
        // <ScrollArea
        //     className={cn(
        //         className,
        //         cls.sidebar,
        //         'rounded-md bg-white p-4 shadow-md',
        //     )}
        // >
        <Tabs
            defaultValue='basic'
            className={cn('')}
        >
            <TabsList className='mb-8 grid w-full grid-cols-2'>
                <TabsTrigger value='basic'>Basic</TabsTrigger>
                <TabsTrigger value='advanced'>Advanced</TabsTrigger>
            </TabsList>
            <ScrollArea>
                <TabsContent
                    value='basic'
                    className='p-2'
                >
                    <FormIdentity />
                    <FormImages className={'mb-4'} />
                    <FormMintingSettings />
                    <FormFunctionalitySettings />
                    <FormMetadataOptional />
                </TabsContent>
            </ScrollArea>
            <TabsContent
                value='advanced'
                className='p-2'
            >
                <FormMetadataFile />
                <FormIdentity />
                <FormMintingSettings />
                <FormFunctionalitySettings />
                <FormMetadataOptional />
                <FormAttributes className='mb-4' />
                <FormAssets />
            </TabsContent>
        </Tabs>
        // </ScrollArea>
    );
}
