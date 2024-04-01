import { render } from '@testing-library/react';

import { ScrollArea } from './scroll-area';

describe('scroll-area', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ScrollArea />);
        expect(baseElement).toBeTruthy();
    });
});
