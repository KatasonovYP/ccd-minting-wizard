import { render } from '@testing-library/react';
import { Tabs } from './tabs';

describe('tabs', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Tabs />);
        expect(baseElement).toBeTruthy();
    });
});
