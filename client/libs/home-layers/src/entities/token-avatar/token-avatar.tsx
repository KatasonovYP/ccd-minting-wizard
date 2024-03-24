import cn from 'classnames';
import cls from './token-avatar.module.css';
import { useMintStore } from '@/shared/store/mint-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface TokenAvatarProps {
    className?: string;
}

export function TokenAvatar(props: TokenAvatarProps) {
    const { className } = props;

    const thumbnail = useMintStore((store) => store.optionalFields.thumbnail);
    const name = useMintStore((store) => store.identity.name);

    if (!thumbnail) return null;

    return (
        <Avatar className={cn(className, cls.tokenAvatar)}>
            <AvatarImage
                src={thumbnail.url}
                alt={name}
            />
            <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
    );
}
