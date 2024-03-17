import { runExecutor } from '@nx/devkit';
import type { ExecutorContext } from '@nx/devkit';
import type { CiExecutorSchema } from './schema';

export default async function multipleExecutor(
    options: CiExecutorSchema,
    context: ExecutorContext,
) {
    const targets = ['prettier', 'lint'];
    let success = true;

    for (const target of targets) {
        try {
            for await (const output of await runExecutor(
                { project: context.projectName, target },
                { fix: options.fix },
                context,
            )) {
                success &&= output.success;
            }
        } catch (e) {
            success = false;
        }
    }
    return { success };
}
