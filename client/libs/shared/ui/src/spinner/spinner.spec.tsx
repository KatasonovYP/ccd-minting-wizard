import { render } from '@testing-library/react';
import { Spinner } from './spinner';

describe('spinner', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Spinner />);
        expect(baseElement).toBeTruthy();
    });
});
