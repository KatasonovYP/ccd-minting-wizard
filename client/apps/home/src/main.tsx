import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';
import '@/shared/css';
import '@/shared/config/i18n';
import { ConcordiumProvider } from './app/providers/concordium-provider';
import { LoadingPage } from '@/home/pages/loading-page';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <StrictMode>
        <Suspense fallback={<LoadingPage />}>
            <ConcordiumProvider>
                <App />
            </ConcordiumProvider>
        </Suspense>
    </StrictMode>,
);
