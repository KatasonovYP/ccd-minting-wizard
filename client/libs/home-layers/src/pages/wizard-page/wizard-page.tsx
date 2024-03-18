import cn from 'classnames';
import { ConnectButton } from '../../features/connect-button';
import { FormMetadata } from '../../features/form-metadata/ui/form-metadata';
import { FormIdentity } from '../../features/form-identity';
import { DeployContract } from '../../features/deploy-contract';
import { ShowCode } from '../../widgets/show-code';
import { DownloadContract } from '../../features/download-contract';
import { FormMintingSettings } from '../../features/form-minting-settings';
import { CopyContract } from '../../features/copy-contract';
import { FormFunctionalitySettings } from '../../features/form-functionality-settings';
import cls from './wizard-page.module.css';
import { ConcordiumLogoIcon } from '@/shared/assets/icons';

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
                    {/*<DownloadMetadata />*/}
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
                    <FormMetadata />
                    <FormIdentity />
                    <FormMintingSettings />
                    <FormFunctionalitySettings />
                </div>
                <ShowCode className={'shadow-md'} />
            </div>
        </div>
    );
}
