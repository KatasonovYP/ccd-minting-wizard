import * as path from 'path';
import { componentGenerator } from '../component/generator';
import type { Tree } from '@nx/devkit';
import type { ComponentGeneratorSchema } from './schema';

const pathToShared = ['libs', 'shared', 'ui', 'src'];
const pathToLayers = ['libs', 'home-layers', 'src'];

export async function sliceGenerator(
    tree: Tree,
    options: ComponentGeneratorSchema,
) {
    const directory =
        options.layer === 'shared'
            ? path.join(...pathToShared, options.name)
            : path.join(...pathToLayers, options.layer, options.name);
    await componentGenerator(tree, {
        ...options,
        directory,
    });
}

export default sliceGenerator;
