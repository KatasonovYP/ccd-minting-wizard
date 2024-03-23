import type { MintStoreActions } from '@/shared/store/mint-store';

export type Setter = MintStoreActions[keyof MintStoreActions];
