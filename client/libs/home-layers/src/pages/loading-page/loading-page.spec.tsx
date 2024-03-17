import { render } from '@testing-library/react';
import { LoadingPage } from './loading-page';

describe('loading-page', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<LoadingPage />);
        expect(baseElement).toBeTruthy();
    });
});
