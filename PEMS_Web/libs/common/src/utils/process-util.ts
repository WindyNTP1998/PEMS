/* eslint-disable @typescript-eslint/no-explicit-any */
import { interval, MonoTypeOperatorFunction, Observable, of, pipe, Subscription } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

// @dynamic
export class BravoProcessUtil {
    public static minDefaultDelay = 10;

    public static debounce(func: (...args: any[]) => any, wait: number) {
        if (wait <= 0) return func;

        let timeout: any;
        return (...args: any[]) => {
            const context = this;

            const executeFunction = () => {
                func.apply(context, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(executeFunction, wait);
        };
    }

    public static delay(
        callback: (...args: any[]) => void,
        immediateOrTime?: number | boolean,
        cancelOn$?: Observable<any>,
        ...args: any[]
    ): Subscription {
        if (immediateOrTime === true || (typeof immediateOrTime == 'number' && immediateOrTime === 0)) {
            callback(args);
            return new Subscription();
        } else {
            const delayObs = pipe(
                cancelOn$ != undefined ? takeUntil(cancelOn$) : (obs: Observable<any>) => obs,
                delay(
                    immediateOrTime == undefined || immediateOrTime === false
                        ? BravoProcessUtil.minDefaultDelay
                        : immediateOrTime
                )
            );
            return delayObs(of(undefined)).subscribe(() => callback(args));
        }
    }

    public static interval(
        callback: (intervalSubscriber: Subscription) => any,
        ms: number,
        maximumCount?: number,
        ...pipeOps: MonoTypeOperatorFunction<any>[]
    ): Subscription {
        let count = 1;
        let intervalObs = interval(ms);
        if (pipeOps != undefined) {
            intervalObs = pipeOps.reduce((obs, currentPipeOp) => {
                return obs.pipe(currentPipeOp);
            }, intervalObs);
        }
        const intervalSubscriber = intervalObs.subscribe(() => {
            callback(intervalSubscriber);
            if (maximumCount != undefined && maximumCount <= count) intervalSubscriber.unsubscribe();
            count++;
        });
        return intervalSubscriber;
    }

    public static doInterval(
        callback: (intervalSubscriber: Subscription) => any,
        ms: number,
        maximumCount?: number,
        ...pipeOps: MonoTypeOperatorFunction<any>[]
    ): Subscription {
        const intervalSubscriber = BravoProcessUtil.interval(callback, ms, maximumCount, ...pipeOps);
        callback(intervalSubscriber);
        return intervalSubscriber;
    }
}
