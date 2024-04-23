import { render } from '@testing-library/react';

import { DropdownMenu } from './dropdown-menu';

describe('dropdown-menu', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DropdownMenu />);
        expect(baseElement).toBeTruthy();
    });
});
