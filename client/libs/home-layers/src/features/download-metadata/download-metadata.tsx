import cn from 'classnames';
import cls from './download-metadata.module.css';
import { useMetadata } from '@/shared/utils/hooks/use-metadata';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';

interface DownloadMetadataProps {
    className?: string;
}

const options = { type: 'application/json' };

export function DownloadMetadata(props: DownloadMetadataProps) {
    const { className } = props;
    const { metadata, name } = useMetadata();

    return (
        <div className={cn(className, cls.downloadMetadata)}>
            <a
                download={`${name}_metadata.json`}
                target='_blank'
                rel='noreferrer'
                href={URL.createObjectURL(metadata)}
            >
                <DropdownMenuItem>
                    <span>Download Metadata</span>
                </DropdownMenuItem>
            </a>
        </div>
    );
}
