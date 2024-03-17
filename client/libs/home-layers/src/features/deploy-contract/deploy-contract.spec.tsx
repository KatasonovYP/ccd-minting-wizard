import { render } from '@testing-library/react';
import { DeployContract } from './deploy-contract';

describe('deploy-contract', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DeployContract />);
        expect(baseElement).toBeTruthy();
    });
});
