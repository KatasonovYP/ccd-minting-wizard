import executor from './executor';
import type { PrettierExecutorSchema } from './schema';

const options: PrettierExecutorSchema = { fix: false };

describe('Prettier Executor', () => {
    it('can run', async () => {
        const output = await executor(options, undefined);
        expect(output.success).toBe(true);
    });
});
