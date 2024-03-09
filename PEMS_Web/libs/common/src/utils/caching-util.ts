import { BravoDateUtil } from './date-util';
import { BravoStringUtil } from './string-util';

export class BravoCachingUtil {
    public static getString(key: string): string | undefined {
        return <string | undefined>localStorage.getItem(key);
    }

    public static getDate(key: string): Date | undefined {
        const stringValue = localStorage.getItem(key);
        if (stringValue == undefined) return undefined;
        return BravoDateUtil.parseDate(stringValue);
    }

    public static getBoolean(key: string): boolean | undefined {
        const stringValue = localStorage.getItem(key);
        if (stringValue == undefined) return undefined;
        return BravoStringUtil.toBoolean(stringValue);
    }

    public static setString(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static setJson<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    }

    public static getNumber(key: string): number | undefined {
        const stringValue = localStorage.getItem(key);
        if (stringValue == undefined) return undefined;
        return parseInt(stringValue);
    }

    public static getJson<T>(key: string): T | undefined {
        const stringValue = localStorage.getItem(key);
        if (stringValue == undefined) return undefined;
        return JSON.parse(stringValue);
    }

    public static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
