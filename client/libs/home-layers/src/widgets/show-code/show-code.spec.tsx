import { render } from '@testing-library/react';
import { ShowCode } from './show-code';

describe('show-code', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ShowCode />);
        expect(baseElement).toBeTruthy();
    });
});
