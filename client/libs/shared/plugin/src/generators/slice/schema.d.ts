import type { Schema } from '@nx/react/src/generators/component/schema';

export interface ComponentGeneratorSchema extends Schema {
    layer: 'shared' | 'entities' | 'features' | 'widgets' | 'pages';
}
