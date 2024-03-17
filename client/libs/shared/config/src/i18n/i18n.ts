import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nConfig } from './settings';

function importResources(language: string, namespace: string) {
    return import(`./locales/${language}/${namespace}.json`);
}

// eslint-disable-next-line import/no-default-export
export default i18n
    .use(LanguageDetector)
    .use(resourcesToBackend(importResources))
    .use(initReactI18next)
    .init({
        // debug: __IS_DEV__,
        debug: false,
        ns: i18nConfig.namespaces,
        supportedLngs: i18nConfig.locales,
        fallbackLng: i18nConfig.defaultLocale,
        interpolation: { escapeValue: false }, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    })
    .then(null);
