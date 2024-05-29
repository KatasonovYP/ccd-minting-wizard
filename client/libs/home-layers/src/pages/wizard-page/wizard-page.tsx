import cn from 'classnames';
import { Download } from 'lucide-react';
import { ConnectButton } from '../../features/connect-button';
import { DeployContract } from '../../features/deploy-contract';
import { ShowCode } from '../../widgets/show-code';
import { DownloadContract } from '../../features/download-contract';
import { CopyContract } from '../../features/copy-contract';
import { DownloadMetadata } from '../../features/download-metadata';
import { Sidebar } from '../../widgets/sidebar/sidebar';
import { SelectNetwork } from '../../features/select-network/select-network';
import cls from './wizard-page.module.css';
import { ConcordiumLogoIcon } from '@/shared/assets/icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';

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
                    <SelectNetwork />
                    <ConnectButton />
                    <CopyContract />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size={'icon'}
                                variant={'outline'}
                            >
                                <Download size={'16'} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={'end'}>
                            <DownloadContract />
                            <DownloadMetadata />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeployContract />
                </div>
            </div>
            <div className={cls.content}>
                <Sidebar />
                <ShowCode className={'shadow-md'} />
            </div>

            <p className={cn('mt-4 text-xs')}>
                This tool is fully open sourced and community driven, source
                code can be found in{' '}
                <a
                    className='link'
                    target={'_blank'}
                    href={'https://github.com/KatasonovYP/ccd-minting-wizard'}
                >
                    here
                </a>{' '}
                to contribution.
            </p>
        </div>
    );
}
