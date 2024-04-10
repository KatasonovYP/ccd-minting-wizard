import { render } from '@testing-library/react';

import { Dialog } from './dialog';

describe('dialog', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Dialog />);
        expect(baseElement).toBeTruthy();
    });
});
