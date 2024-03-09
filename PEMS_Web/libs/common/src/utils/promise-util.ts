// @dynamic
export class BravoPromiseUtil {
    public static errorInline<T, TError extends object | string | number = object>(
        promise: Promise<T>
    ): Promise<[TError, undefined] | [undefined, T]> {
        return promise
            .then(data => {
                return <[undefined, T]>[undefined, data];
            })
            .catch(err => <[TError, undefined]>[err, undefined]);
    }

    public static errorInlineSelect<
        T,
        TError extends object | string | number = object,
        TSelectError extends object | string | number = object
    >(
        promise: Promise<T>,
        errorSelect: (error: TError) => TSelectError
    ): Promise<[TSelectError, undefined] | [undefined, T]> {
        return promise
            .then(data => {
                return <[undefined, T]>[undefined, data];
            })
            .catch(err => <[TSelectError, undefined]>[errorSelect(err), undefined]);
    }
}
