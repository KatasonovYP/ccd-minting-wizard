import { render } from '@testing-library/react';

import { Select } from './select';

describe('select', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Select />);
        expect(baseElement).toBeTruthy();
    });
});
