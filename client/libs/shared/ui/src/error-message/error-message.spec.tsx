import { render } from '@testing-library/react';
import { ErrorMessage } from './error-message';

describe('error-message', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ErrorMessage />);
        expect(baseElement).toBeTruthy();
    });
});
