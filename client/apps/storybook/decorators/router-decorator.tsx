import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';

export function RouterDecorator(Story: () => ReactNode) {
    return (
        <MemoryRouter>
            <Routes>
                <Route
                    path='/*'
                    element={<Story />}
                />
            </Routes>
        </MemoryRouter>
    );
}
