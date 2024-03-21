import { Cis2 } from '@/shared/store/mint-store';

function hasExpectedKeys(
    json: Record<string, unknown>,
    expectedKeys: Array<keyof Cis2>,
) {
    const jsonKeys = Object.keys(json);
    return (
        jsonKeys.length <= expectedKeys.length &&
        jsonKeys.every((key) => expectedKeys.includes(key as keyof Cis2))
    );
}

export function cis2Validator(src: Record<string, unknown>) {
    return hasExpectedKeys(src, [
        'name',
        'description',
        'symbol',
        'unique',
        'decimals',
        'artifact',
        'display',
        'thumbnail',
        'assets',
        'attributes',
        'localization',
    ]);
}
