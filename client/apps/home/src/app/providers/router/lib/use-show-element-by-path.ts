import { useMatches } from 'react-router-dom';

export function useShowElementByPath(paths: string[]) {
    const matches = useMatches();
    const parentPath = matches.length >= 3 ? matches[2].pathname : 'default';
    return paths.includes(parentPath);
}
