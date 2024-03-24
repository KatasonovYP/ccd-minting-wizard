import cn from 'classnames';
import cls from './token-avatar.module.css';
import { useMintStore } from '@/shared/store/mint-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface TokenAvatarProps {
    className?: string;
    type: 'display' | 'thumbnail';
}

export function TokenAvatar(props: TokenAvatarProps) {
    const { className, type } = props;

    const isDisplay = type === 'display';

    const thumbnail = useMintStore((store) => store.optionalFields.thumbnail);
    const display = useMintStore((store) => store.optionalFields.display);
    const name = useMintStore((store) => store.identity.name);

    if (isDisplay && !display) return null;

    if (!isDisplay && !thumbnail) return null;

    return (
        <Avatar
            className={cn(className, cls.tokenAvatar, isDisplay && 'h-64 w-64')}
        >
            <AvatarImage
                src={isDisplay ? display?.url : thumbnail?.url}
                alt={name}
            />
            <AvatarFallback>invalid url</AvatarFallback>
        </Avatar>
    );
}
