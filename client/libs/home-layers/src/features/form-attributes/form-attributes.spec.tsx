import { render } from '@testing-library/react';
import { FormAttributes } from './form-attributes';

describe('form-attributes', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormAttributes />);
        expect(baseElement).toBeTruthy();
    });
});
