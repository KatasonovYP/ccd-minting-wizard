import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readProjectConfiguration } from '@nx/devkit';
import componentGenerator from './generator';
import type { Tree } from '@nx/devkit';
import type { ComponentGeneratorSchema } from './schema';

describe('slice generator', () => {
    let tree: Tree;
    const options: ComponentGeneratorSchema = {
        name: 'test',
        style: 'css',
        layer: 'shared',
    };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await componentGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'test');
        expect(config).toBeDefined();
    });
});
