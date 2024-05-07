import { render } from '@testing-library/react';
import { Hint } from './hint';

describe('hint', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Hint />);
        expect(baseElement).toBeTruthy();
    });
});
