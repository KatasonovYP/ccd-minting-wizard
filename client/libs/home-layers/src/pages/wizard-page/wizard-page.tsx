import cn from 'classnames';
import { ConnectButton } from '../../features/connect-button';
import { FormIdentity } from '../../features/form-identity';
import { DeployContract } from '../../features/deploy-contract';
import { ShowCode } from '../../widgets/show-code';
import { DownloadContract } from '../../features/download-contract';
import { FormMintingSettings } from '../../features/form-minting-settings';
import { CopyContract } from '../../features/copy-contract';
import { FormMetadataOptional } from '../../features/form-metadata-optional';
import { DownloadMetadata } from '../../features/download-metadata';
import { FormFunctionalitySettings } from '../../features/form-functionality-settings';
import { FormAttributes } from '../../features/form-attributes';
import cls from './wizard-page.module.css';
import { ConcordiumLogoIcon } from '@/shared/assets/icons';
import { FormMetadataFile } from '@/home/features/form-metadata-file';
import { FormAssets } from '@/home/features/form-assets';

interface WizardPageProps {
    className?: string;
}

export function WizardPage(props: WizardPageProps) {
    const { className } = props;

    return (
        <div className={cn(className, cls.wizardPage)}>
            <div className='mb-4 flex items-center justify-between'>
                <ConcordiumLogoIcon />
                <div className='flex gap-4'>
                    <ConnectButton />
                    <CopyContract />
                    <DownloadContract />
                    <DownloadMetadata />
                    <DeployContract />
                </div>
            </div>
            <div className={cls.content}>
                <div
                    className={cn(
                        cls.forms,
                        'rounded-lg bg-white p-4 shadow-md',
                    )}
                >
                    <FormMetadataFile />
                    <FormIdentity />
                    <FormMintingSettings />
                    <FormFunctionalitySettings />
                    <FormMetadataOptional />
                    <FormAttributes className='mb-4' />
                    <FormAssets />
                </div>
                <ShowCode className={'shadow-md'} />
            </div>
        </div>
    );
}
