import { useMatches } from 'react-router-dom';
import type { BackgroundProps } from '@/shared/ui/background';
import { staticRoutes } from '@/shared/config/const';

const backgroundPathByProps: Record<string, BackgroundProps> = {
    default: { type: 'inverted' },
};

export function useBackgroundPropsByPath() {
    const matches = useMatches();
    const parentPath = matches.length >= 3 ? matches[2].pathname : 'default';
    return (
        parentPath in backgroundPathByProps && backgroundPathByProps[parentPath]
    );
}
