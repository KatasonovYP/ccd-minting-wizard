import { render } from '@testing-library/react';
import { Text } from './text';

describe('text', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Text text='hello' />);
        expect(baseElement).toBeTruthy();
    });
});
