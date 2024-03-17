import { Navigate, Outlet } from 'react-router-dom';
import { staticRoutes } from '@/shared/config/const';

export function ProtectedRoutesLayout() {
    const isAuth = true;
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate
            to={staticRoutes['not-found']}
            replace
        />
    );
}
