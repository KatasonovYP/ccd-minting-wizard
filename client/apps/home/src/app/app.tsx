import { RouterProvider } from 'react-router-dom';
import { router } from './providers/router/config/router';

export function App() {
    return <RouterProvider router={router} />;
}
