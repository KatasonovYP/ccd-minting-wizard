import { render } from '@testing-library/react';
import { ResultContent } from './result-content';

describe('result-content', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ResultContent />);
        expect(baseElement).toBeTruthy();
    });
});
