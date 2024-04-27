import { render } from '@testing-library/react';
import { ResultPage } from './result-page';

describe('result-page', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ResultPage />);
        expect(baseElement).toBeTruthy();
    });
});
