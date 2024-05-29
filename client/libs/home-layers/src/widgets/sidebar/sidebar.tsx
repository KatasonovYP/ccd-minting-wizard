import cn from 'classnames';
import { FormIdentity } from '../../features/form-identity/form-identity';
import { FormMintingSettings } from '../../features/form-minting-settings/form-minting-settings';
import { FormFunctionalitySettings } from '../../features/form-functionality-settings/form-functionality-settings';
import { FormMetadataFile } from '../../features/form-metadata-file/ui/form-metadata-file';
import { FormMetadataOptional } from '../../features/form-metadata-optional/form-metadata-optional';
import { FormAttributes } from '../../features/form-attributes/form-attributes';
import { FormAssets } from '../../features/form-assets/form-assets';
import { FormImages } from '../../features/form-images/form-images';
import cls from './sidebar.module.css';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

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
                <TabsList className='mb-8 grid w-full grid-cols-2'>
                    <TabsTrigger value='basic'>Basic</TabsTrigger>
                    <TabsTrigger value='advanced'>Advanced</TabsTrigger>
                </TabsList>
                <TabsContent
                    value='basic'
                    className='p-2'
                >
                    <h2 className='mb-4 text-xl'>Metadata settings</h2>
                    <FormIdentity />
                    <FormImages className={'mb-4'} />
                    <FormMetadataOptional />
                    <div className='my-4 h-[1px] w-full bg-neutral-300' />
                    <h2 className='mb-4 text-xl'>Contract settings</h2>
                    <FormMintingSettings />
                </TabsContent>
                <TabsContent
                    value='advanced'
                    className='p-2'
                >
                    <h2 className='mb-4 text-xl'>Metadata Upload (optional)</h2>
                    <FormMetadataFile />
                    <h2 className='mb-4 text-xl'>Metadata Settings</h2>
                    <FormIdentity />
                    <FormImages className={'mb-4'} />
                    <FormMetadataOptional />
                    <FormAttributes className='mb-4' />
                    <div className='my-4 h-[1px] w-full bg-neutral-300' />
                    <h2 className='mb-4 text-xl'>Contract Settings</h2>
                    <FormMintingSettings />
                    <FormFunctionalitySettings />
                </TabsContent>
            </Tabs>
        </ScrollArea>
    );
}
