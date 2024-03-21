import { Cis2 } from './cis-2';

export interface Identity
    extends Required<Pick<Cis2, 'name' | 'description'>> {}

export interface Cis2Optional extends Omit<Cis2, keyof Identity> {}
