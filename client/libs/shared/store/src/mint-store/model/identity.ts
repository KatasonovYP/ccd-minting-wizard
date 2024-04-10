import type { Cis2 } from './cis-2';

export type Identity = Required<Pick<Cis2, 'name' | 'description'>>;

export type Cis2Optional = Omit<
    Cis2,
    keyof Identity | 'assets' | 'attributes' | 'localization' | 'display' | 'thumbnail'
>;
