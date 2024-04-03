import { render } from '@testing-library/react';

import { FormImages } from './form-images';

describe('form-images', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormImages />);
        expect(baseElement).toBeTruthy();
    });
});
