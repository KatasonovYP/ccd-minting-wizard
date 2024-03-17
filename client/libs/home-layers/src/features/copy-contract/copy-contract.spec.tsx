import { render } from '@testing-library/react';
import { CopyContract } from './copy-contract';

describe('copy-contract', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CopyContract />);
        expect(baseElement).toBeTruthy();
    });
});
