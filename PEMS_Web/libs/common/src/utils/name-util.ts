import { FullNameFormat } from '../constants/full-name-format.constant';

export default class NameUtils {
    public static buildFullNameByFormat(
        firstName: string,
        middleName: string,
        lastName: string,
        format: string = FullNameFormat.FirstMiddleLast
    ): string {
        switch (format) {
            case FullNameFormat.FirstMiddleLast:
                return [firstName, middleName, lastName]
                    .filter(x => x)
                    .join(' ')
                    .trim();

            case FullNameFormat.LastFirst:
                return [lastName, firstName]
                    .filter(x => x)
                    .join(' ')
                    .trim();

            default:
                return [lastName, middleName, firstName]
                    .filter(x => x)
                    .join(' ')
                    .trim();
        }
    }
}
