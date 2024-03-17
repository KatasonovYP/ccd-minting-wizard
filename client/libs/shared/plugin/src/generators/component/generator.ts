import * as path from 'path';
import { formatFiles, generateFiles } from '@nx/devkit';
import { camelCase, pascalCase } from 'change-case';
import { componentGenerator as nxComponentGenerator } from '@nx/react';
import type { Tree } from '@nx/devkit';
import type { Schema } from '@nx/react/src/generators/component/schema';

export async function componentGenerator(tree: Tree, options: Schema) {
    await nxComponentGenerator(tree, {
        ...options,
        style: 'css',
        nameAndDirectoryFormat: 'as-provided',
    });

    generateFiles(tree, path.join(__dirname, 'files'), options.directory, {
        ...options,
        pascalCase,
        camelCase,
    });
    await formatFiles(tree);
}

export default componentGenerator;
