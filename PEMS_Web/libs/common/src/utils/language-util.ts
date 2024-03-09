import { Dictionary } from '../typings';

export class BravoLanguageUtil {
    public static getBrowserLang() {
        return window.navigator.language.substr(0, 2);
    }

    public static getBrowserLangTranslatedText(value: Dictionary<string>, defaultLang: string) {
        const browserLang = BravoLanguageUtil.getBrowserLang();
        return value[browserLang] != undefined
            ? value[browserLang]
            : value[defaultLang] != undefined
            ? value[defaultLang]
            : '';
    }
}
