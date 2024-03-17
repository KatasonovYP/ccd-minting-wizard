import executor from './executor';
import type { CiExecutorSchema } from './schema';

const options: CiExecutorSchema = { fix: false };

describe('Ci Executor', () => {
    it('can run', async () => {
        const output = await executor(options, undefined);
        expect(output.success).toBe(true);
    });
});
