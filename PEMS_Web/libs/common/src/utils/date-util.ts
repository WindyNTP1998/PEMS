import { BravoStringUtil } from './string-util';
import * as moment from 'moment/moment';

export class BravoDateUtil {
    public static format(
        value: string | number | Date,
        format: string = 'DD/MM/YYYY',
        isUtcTime: boolean = false
    ): string {
        return BravoDateUtil.moment(value, isUtcTime).format(format);
    }

    public static parseDate(value: string | number | Date): Date {
        if (value instanceof Date) return value;
        const result = BravoDateUtil.moment(value);
        if (!result.isValid()) {
            throw new Error('Can\'t parse value to Date');
        }
        return result.toDate();
    }

    public static isValidDate(value: string | number | Date): boolean {
        if (value instanceof Date) return true;
        if (value == undefined || value == '') return false;
        if (BravoStringUtil.isNumber(value)) return false;
        if (typeof value === 'string' && value.match(/^[A-Za-z]+/) != undefined) return false;
        return BravoDateUtil.moment(value).isValid();
    }

    public static addDay(currentDate: string | number | Date, value: number): Date {
        return BravoDateUtil.moment(currentDate).add(value, 'day').toDate();
    }

    public static addMonth(currentDate: string | number | Date, value: number): Date {
        return BravoDateUtil.moment(currentDate).add(value, 'month').toDate();
    }

    public static addYear(currentDate: string | number | Date, value: number): Date {
        return BravoDateUtil.moment(currentDate).add(value, 'year').toDate();
    }

    public static moment(value: string | number | Date, isUtcTime: boolean = false) {
        if (typeof value == 'string' && BravoStringUtil.isNumber(value)) {
            value = new Date(parseInt(value));
        }
        return isUtcTime ? moment.utc(value) : moment(value);
    }

    public static getDate(year: number, month: number, day: number) {
        return new Date(year, month - 1, day);
    }

    public static getDayStartEndOfDay(value: string | number | Date) {
        return BravoDateUtil._getStartEndOfDay(value, 'day');
    }

    public static getWeekStartEndOfDay(value: string | number | Date) {
        return BravoDateUtil._getStartEndOfDay(value, 'isoWeek');
    }

    public static getMonthStartEndOfDay(value: string | number | Date) {
        return BravoDateUtil._getStartEndOfDay(value, 'month');
    }

    public static getQuarterStartEndOfDay(value: string | number | Date) {
        return BravoDateUtil._getStartEndOfDay(value, 'quarter');
    }

    public static getYearStartEndOfDay(value: string | number | Date) {
        return BravoDateUtil._getStartEndOfDay(value, 'year');
    }

    public static diffInSeconds(value1: Date, value2: Date) {
        return (value1.getTime() - value2.getTime()) / 1000;
    }

    public static diff(value1: Date, value2: Date) {
        return value1.getTime() - value2.getTime();
    }

    public static isCurrentDateAfter(currentDate: Date, targetDate: Date, isEqual: boolean = false): boolean {
        return isEqual ? targetDate.getTime() <= currentDate.getTime() : targetDate.getTime() < currentDate.getTime();
    }

    public static isCurrentDateBefore(currentDate: Date, targetDate: Date, isEqual: boolean = false): boolean {
        return isEqual ? currentDate.getTime() <= targetDate.getTime() : currentDate.getTime() < targetDate.getTime();
    }

    public static isCurrentDateOutOfDateRange(
        currentDate: Date,
        fromDate: Date,
        toDate: Date,
        isEqual: boolean = false
    ): boolean {
        return (
            this.isCurrentDateBefore(currentDate, fromDate, isEqual) ||
            this.isCurrentDateAfter(currentDate, toDate, isEqual)
        );
    }

    private static _getStartEndOfDay(value: string | number | Date, period: moment.unitOfTime.StartOf) {
        const momentDay = BravoDateUtil.moment(value);
        const start = momentDay.startOf(period).startOf('day').toDate();
        const end = momentDay.endOf(period).endOf('day').toDate();
        return {
            start: start,
            end: end
        };
    }
}
