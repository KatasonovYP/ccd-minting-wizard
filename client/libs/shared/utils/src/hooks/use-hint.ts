import { useTranslation } from 'react-i18next';

export function useHint(name: string) {
    const { t } = useTranslation();
    const template = `hint.${name}`;
    const hintRaw = t(template, { defaultValue: undefined });
    const hint = hintRaw === template ? undefined : hintRaw;
    return { hint };
}
