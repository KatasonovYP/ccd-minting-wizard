import { render } from '@testing-library/react';
import { Checkbox } from './checkbox';

describe('checkbox', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Checkbox />);
        expect(baseElement).toBeTruthy();
    });
});
