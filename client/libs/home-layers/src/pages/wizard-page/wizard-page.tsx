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

interface WizardPageProps {
    className?: string;
}

export function WizardPage(props: WizardPageProps) {
    const { className } = props;

    return (
        <div className={cn(className, cls.wizardPage)}>
            <div className={cls.header}>
                <ConnectButton />
                <CopyContract />
                <DownloadContract />
                <DeployContract />
            </div>
            <div className={cls.content}>
                <div className='rounded-lg bg-white p-4 shadow-md'>
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
