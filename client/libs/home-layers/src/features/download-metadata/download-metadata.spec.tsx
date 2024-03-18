import { render } from '@testing-library/react';
import { DownloadMetadata } from './download-metadata';

describe('download-metadata', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DownloadMetadata />);
        expect(baseElement).toBeTruthy();
    });
});
