import { render } from '@testing-library/react';

import { Tooltip } from './tooltip';

describe('tooltip', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Tooltip />);
        expect(baseElement).toBeTruthy();
    });
});
