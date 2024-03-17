import * as path from 'path';
import { execSync } from 'child_process';
import type { PrettierExecutorSchema } from './schema';
import type { ExecutorContext } from 'nx/src/config/misc-interfaces';

export default async function runExecutor(
    options: PrettierExecutorSchema,
    context: ExecutorContext,
) {
    const projectRoot = path.resolve(
        context.root,
        context.workspace.projects[context.projectName].root,
    );
    let success = true;
    try {
        execSync(
            `prettier ${projectRoot} ${options.fix ? '--write' : '--check'}`,
        );
    } catch (error: unknown) {
        success = false;
    }
    return {
        success,
    };
}
