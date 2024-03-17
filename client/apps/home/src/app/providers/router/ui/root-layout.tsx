import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useBackgroundPropsByPath } from '../lib/use-background-props-by-path';
import { Background } from '@/shared/ui/background';
import { Spinner } from '@/shared/ui/spinner';

export function RootLayout() {
    const backgroundProps = useBackgroundPropsByPath();
    return (
        <Background {...backgroundProps}>
            <Suspense fallback={<Spinner />}>
                <Outlet />
            </Suspense>
        </Background>
    );
}
