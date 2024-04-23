import { render } from '@testing-library/react';
import { Avatar } from './avatar';

describe('avatar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Avatar />);
        expect(baseElement).toBeTruthy();
    });
});
