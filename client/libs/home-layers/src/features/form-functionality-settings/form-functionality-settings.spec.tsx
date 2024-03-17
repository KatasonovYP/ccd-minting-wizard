import { render } from '@testing-library/react';
import { FormFunctionalitySettings } from './form-functionality-settings';

describe('form-functionality-settings', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormFunctionalitySettings />);
        expect(baseElement).toBeTruthy();
    });
});
