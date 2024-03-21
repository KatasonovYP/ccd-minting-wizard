export interface Cis2Url {
    url: string;
    hash?: string;
}

export interface Cis2Attribute {
    type: string;
    name: string;
    value: string;
}

export interface Cis2 {
    name?: string;
    symbol?: string;
    unique?: boolean;
    decimals?: number;
    description?: string;
    thumbnail?: Cis2Url;
    display?: Cis2Url;
    artifact?: Cis2Url;
    assets?: Cis2Url[];
    attributes?: Cis2Attribute[];
    localization?: Cis2Url[];
}
