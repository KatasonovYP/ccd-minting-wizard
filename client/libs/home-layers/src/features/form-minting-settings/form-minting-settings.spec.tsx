import { render } from '@testing-library/react';
import { FormMintingSettings } from './form-minting-settings';

describe('form-minting-settings', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormMintingSettings />);
        expect(baseElement).toBeTruthy();
    });
});
