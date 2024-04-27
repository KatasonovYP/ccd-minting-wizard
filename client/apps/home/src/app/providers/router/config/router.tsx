import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../ui/root-layout';
import { ProtectedRoutesLayout } from '../ui/protected-routes-layout';
import { PublicRoutesLayout } from '../ui/public-routes-layout';
import type { RouteObject } from 'react-router-dom';
import { staticRoutes } from '@/shared/config/const';
import { NotFoundPage } from '@/home/pages/not-found-page';
// import { HomePage } from '@/home/pages/home-page';
import { WizardPage } from '@/home/pages/wizard-page';
import { ResultPage } from '@/home/pages/result-page';

const publicRoutes: RouteObject[] = [
    { path: staticRoutes.main, element: <WizardPage /> },
    { path: staticRoutes.result, element: <ResultPage /> },
];

const protectedRoutes: RouteObject[] = [];

const routes: RouteObject[] = [
    {
        element: <RootLayout />,
        children: [
            { element: <ProtectedRoutesLayout />, children: protectedRoutes },
            { element: <PublicRoutesLayout />, children: publicRoutes },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes, { basename: __BASE_PATH__ });
