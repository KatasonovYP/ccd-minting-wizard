import { render } from '@testing-library/react';
import { SelectNetwork } from './select-network';

describe('select-network', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SelectNetwork />);
        expect(baseElement).toBeTruthy();
    });
});
