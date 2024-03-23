import type {
    Cis2Attribute,
    Cis2Optional,
    Identity,
} from '@/shared/store/mint-store';

export type Setter =
    | ((value: Cis2Optional) => void)
    | ((value: Identity) => void)
    | ((value: { attributes: Cis2Attribute[] }) => void);
