export type Setters<Type> = {
    [Property in keyof Type as `set${Capitalize<string & Property>}`]: (value: Type[Property]) => void
};
