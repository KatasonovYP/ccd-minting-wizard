import cn from 'classnames';
import cls from './download-metadata.module.css';
import { useBlobMetadata } from '@/shared/utils/hooks/use-blob-metadata';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';

interface DownloadMetadataProps {
    className?: string;
}

const options = { type: 'application/json' };

export function DownloadMetadata(props: DownloadMetadataProps) {
    const { className } = props;
    const { metadata, name } = useBlobMetadata();

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
