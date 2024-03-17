import type { ReactNode } from 'react';

export function StyleDecorator(Story: () => ReactNode) {
    return <div className=''>{Story()}</div>;
}
