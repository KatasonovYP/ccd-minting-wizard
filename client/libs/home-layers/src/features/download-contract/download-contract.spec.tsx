import { render } from '@testing-library/react';
import { DownloadContract } from './download-contract';

describe('download-contract', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DownloadContract />);
        expect(baseElement).toBeTruthy();
    });
});
