import { render } from '@testing-library/react';

import { FormAssets } from './form-assets';

describe('form-assets', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormAssets />);
        expect(baseElement).toBeTruthy();
    });
});
