import { render } from '@testing-library/react';
import { FormIdentity } from './form-identity';

describe('form-identity', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormIdentity />);
        expect(baseElement).toBeTruthy();
    });
});
