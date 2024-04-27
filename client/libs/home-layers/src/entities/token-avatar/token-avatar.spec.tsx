import { render } from '@testing-library/react';
import { TokenAvatar } from './token-avatar';

describe('token-avatar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TokenAvatar />);
        expect(baseElement).toBeTruthy();
    });
});
