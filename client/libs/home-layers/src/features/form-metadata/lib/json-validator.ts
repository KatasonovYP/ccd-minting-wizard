interface JsonUrl {
    url: string;
    hash: string;
}

function hasExpectedKeys(obj: Object, expectedKeys: Array<string>) {
    const objKeys = Object.keys(obj);
    return (
        objKeys.length <= expectedKeys.length &&
        objKeys.every((key) => expectedKeys.includes(key))
    );
}

function hasRequiredKeys(obj: Object, requiredKeys: string[]) {
    return requiredKeys.every((key) => obj.hasOwnProperty(key));
}

export function jsonValidator(src: Record<string, unknown>) {
    return hasExpectedKeys(src, ['name', 'symbol', 'description', 'unique']);
}
