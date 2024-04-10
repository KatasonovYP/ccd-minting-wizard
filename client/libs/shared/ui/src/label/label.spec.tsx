import { render } from '@testing-library/react';

import { Label } from './label';

describe('label', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Label />);
        expect(baseElement).toBeTruthy();
    });
});
