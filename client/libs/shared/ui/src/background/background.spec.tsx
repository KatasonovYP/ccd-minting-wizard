import { render } from '@testing-library/react';
import { Background } from './background';

describe('background', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Background type='main' />);
        expect(baseElement).toBeTruthy();
    });
});
