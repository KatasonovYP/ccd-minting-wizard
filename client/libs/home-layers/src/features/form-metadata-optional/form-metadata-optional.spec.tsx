import { render } from '@testing-library/react';
import { FormMetadataOptional } from './form-metadata-optional';

describe('form-metadata-optional', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormMetadataOptional />);
        expect(baseElement).toBeTruthy();
    });
});
