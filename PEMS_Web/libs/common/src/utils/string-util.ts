import { Dictionary } from '../typings';

// @dynamic
export class BravoStringUtil {
    private static readonly registeredUniqueStrings: string[] = [];

    public static registerUnique(value: string) {
        if (BravoStringUtil.registeredUniqueStrings.indexOf(value) < 0) {
            BravoStringUtil.registeredUniqueStrings.push(value);
        } else {
            throw new Error(`Value ${value} is registered.`);
        }
        return value;
    }

    public static substrBeforeFirst(originalStr: string, beforeStr: string) {
        const beforeStrIndex = originalStr.indexOf(beforeStr);
        return beforeStrIndex > -1 ? originalStr.substring(0, beforeStrIndex) : originalStr;
    }

    public static isNullOrEmpty(value: string | number | undefined | null) {
        return value == undefined || value.toString().trim() == '';
    }

    public static isNumber(value: string | number | undefined): boolean {
        if (value == undefined) return false;
        return new RegExp('^-?[0-9]\\d*(\\.\\d+)?$').test(value.toString());
    }

    public static toUppercaseSplitByUppercaseWithUnderscore(value: string) {
        return value
            .replace(new RegExp('\\.?([A-Z]|\\d+)', 'g'), (value1: string, value2: string) => {
                return '_' + value2;
            })
            .replace(new RegExp('^_'), '')
            .toUpperCase();
    }

    public static toSplitByUppercaseWithSpace(value: string) {
        return value
            .replace(new RegExp('\\.?([A-Z]|\\d+)', 'g'), (value1: string, value2: string) => {
                return ' ' + value2;
            })
            .replace(new RegExp('^\\s'), '');
    }

    public static toLowercaseSplitByUppercaseWithHyphen(value: string) {
        return value
            .replace(new RegExp('\\.?([A-Z]|\\d+)', 'g'), (value1: string, value2: string) => {
                return '-' + value2.toLowerCase();
            })
            .replace(new RegExp('^-'), '');
    }

    public static toBoolean(value: string | undefined) {
        if (value == undefined) return false;
        if (value == '0' || value.toLowerCase() == 'false') return false;
        if (value == '1' || value.toLowerCase() == 'true') return true;
        throw new Error(`${value} can't be parsed to boolean`);
    }

    public static stringUrlToQueryDic(url: string, urlOrigin?: string) {
        const urlWithoutOrigin = url.replace(urlOrigin != undefined ? urlOrigin : location.origin, '');
        const querySperatorIndex = urlWithoutOrigin.indexOf('?');
        const hashIndex = urlWithoutOrigin.indexOf('#');
        if (querySperatorIndex < 0 || urlWithoutOrigin.length <= 1) return {};

        const onlyQueryUrl =
            hashIndex < querySperatorIndex
                ? urlWithoutOrigin.substr(querySperatorIndex + 1)
                : urlWithoutOrigin.substring(querySperatorIndex + 1, hashIndex);

        const dictionary: Dictionary<unknown> = {};
        const parts = onlyQueryUrl.split('&');
        for (const element of parts) {
            const keyValuePair = element.split('=');

            const key = keyValuePair[0]!;
            let value = keyValuePair[1]!;

            value = decodeURIComponent(value);
            value = value.replace(/\+/g, ' ');

            dictionary[key] = value;
        }

        return dictionary;
    }

    public static uppercaseFirstChar(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    public static toInteger(value: string | number): number {
        const decimalRadix = 10;
        return parseInt(`${value}`, decimalRadix);
    }

    public static isInteger(value: string | number): value is number {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }

    public static generateUUID() {
        let d = new Date().getTime();
        let d2 = typeof performance !== 'undefined' && performance.now != null ? performance.now() * 1000 : 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }

    public static isIncluded(target: string, value: string): boolean {
        return target ? target.trim().toLowerCase().includes(value.trim().toLowerCase()) : false;
    }

    public static transformSpaceTo(text: string, suffix: string | undefined = undefined, linkingSymbol: string = '_') {
        return (
            text.replace(/ /g, `${linkingSymbol}`).toLowerCase() +
            (suffix != undefined ? `${linkingSymbol}${suffix.toLowerCase()}` : '')
        );
    }
}
