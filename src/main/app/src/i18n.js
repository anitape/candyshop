import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import React from "react";
import translationEN from './locales/en/translation';
import translationFI from './locales/fi/translation';

const resources = {
        en: {
            translations: translationEN
        },
        fi: {
            translations: translationFI
        }
    };

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
    // we init with resources
    resources,
    lng: "",
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
    escapeValue: false, // not needed for react!!
        formatSeparator: ","
},

react: {
    wait: true
}
});

export default i18n;
