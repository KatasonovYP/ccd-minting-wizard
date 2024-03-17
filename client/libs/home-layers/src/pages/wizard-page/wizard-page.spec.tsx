import { render } from '@testing-library/react';
import { WizardPage } from './wizard-page';

describe('wizard-page', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<WizardPage />);
        expect(baseElement).toBeTruthy();
    });
});
