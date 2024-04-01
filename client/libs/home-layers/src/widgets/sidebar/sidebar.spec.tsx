import { render } from '@testing-library/react';

import { Sidebar } from './sidebar';

describe('sidebar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Sidebar />);
        expect(baseElement).toBeTruthy();
    });
});
