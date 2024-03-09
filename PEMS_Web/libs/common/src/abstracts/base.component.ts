/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit
} from '@angular/core';

import { asyncScheduler, BehaviorSubject, MonoTypeOperatorFunction, Subject, Subscription } from 'rxjs';
import { takeUntil, tap, throttleTime } from 'rxjs/operators';

import * as BravoObjectUtil from '../utils/object-util';
import { BravoProcessUtil } from '../utils/process-util';

@Directive()
export abstract class BaseComponent implements AfterViewInit, OnDestroy, OnInit, AfterViewChecked {
    public static defaultDetectChangesDelay: number = 20;

    constructor(
        public changeDetectorRef: ChangeDetectorRef,
        public elementRef: ElementRef
    ) {}

    public ngOnInit(): void {
        this._detectChangesThrottle$.pipe(this.untilDestroy()).subscribe();
        this.initiated = true;
    }

    public ngAfterViewInit(): void {
        this.viewInitiated = true;
    }

    public ngAfterViewChecked(): void {
        this.viewChecked = true;
    }

    public ngOnDestroy(): void {
        this.unsubscribeSubscriptions();
        this.onDestroy$.next(null);
        this.onDestroy$.complete();
        this.initiated = false;
        this.destroyed = true;
    }

    public get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    protected initiated: boolean = false;
    protected viewInitiated: boolean = false;
    protected viewChecked: boolean = false;
    protected destroyed: boolean = false;
    protected get canDetectChanges(): boolean {
        return this.initiated && !this.destroyed;
    }
    protected get defaultDetectChangesDelay() {
        return BaseComponent.defaultDetectChangesDelay;
    }

    public errors$: BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);
    private _errors: string[] | undefined;
    public get errors(): string[] | undefined {
        return this._errors;
    }
    public set errors(value: string[] | undefined) {
        if (!BravoObjectUtil.isDifferent(this._errors, value)) return;
        this._errors = value;
        this.errors$.next(value);
        this.detectChanges();
    }
    public connectingApi$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _connectingApi: boolean = false;
    public get connectingApi(): boolean {
        return this._connectingApi;
    }
    public set connectingApi(value: boolean) {
        if (this._connectingApi == value) return;
        this._connectingApi = value;
        this.connectingApi$.next(value);
        this.detectChanges();
    }

    public get errorsAsHtml() {
        return this.getErrorsAsHtml(this.errors);
    }

    public get indentErrorsAsHtml(): string | undefined {
        return this.errors != undefined
            ? this.errors.map(x => `&nbsp;&nbsp;&nbsp;&nbsp;- ${x}`).join('<br>')
            : undefined;
    }

    public unsubscribeSubscriptions() {
        const keys = Object.keys(this);
        const self: any = this;
        keys.forEach(key => {
            const currentKeyValue = self[key];
            if (currentKeyValue instanceof Subscription) {
                currentKeyValue.unsubscribe();
            }
        });
    }

    public onDestroy$: Subject<any> = new Subject();
    public untilDestroy<T>(): MonoTypeOperatorFunction<T> {
        return takeUntil(this.onDestroy$);
    }

    private _detectChangesThrottleSource = new Subject<DetectChangesParams>();
    private _detectChangesThrottle$ = this._detectChangesThrottleSource.pipe(
        throttleTime(300, asyncScheduler, { leading: true, trailing: true }),
        tap(params => {
            this.doDetectChanges(params);
        })
    );
    private _detectChangesDelaySubs: Subscription = new Subscription();
    private doDetectChanges(params: DetectChangesParams) {
        if (this.canDetectChanges) {
            this.changeDetectorRef.detectChanges();
            if (params.checkParentForHostBinding) this.changeDetectorRef.markForCheck();
            if (params.onDone != undefined) params.onDone();
        }
    }

    public detectChanges(
        immediateOrDelay?: boolean | number,
        onDone?: () => any,
        checkParentForHostBinding: boolean = false
    ) {
        this._detectChangesDelaySubs.unsubscribe();
        if (!this.canDetectChanges) return;

        this._detectChangesDelaySubs = BravoProcessUtil.delay(
            () =>
                this._detectChangesThrottleSource.next({
                    onDone: onDone,
                    checkParentForHostBinding: checkParentForHostBinding
                }),
            immediateOrDelay != undefined ? immediateOrDelay : BaseComponent.defaultDetectChangesDelay
        );
    }

    public getErrorsAsHtml(...errorss: (string[] | undefined)[]): string | undefined {
        let result: string = '';
        for (let i = 0; i < errorss.length; i++) {
            const errors = errorss[i];
            if (errors != undefined && errors.length) {
                result += errors.join('<br>');
            }
        }
        return result == '' ? undefined : result;
    }

    protected emitEvent<T>(event: EventEmitter<T>, value: T) {
        if (this.initiated) event.emit(value);
    }

    protected cancelOnDestroyDelay = (fn: () => any, immediateOrTime?: number | boolean): Subscription => {
        return BravoProcessUtil.delay(fn, immediateOrTime, this.onDestroy$);
    };
}

interface DetectChangesParams {
    onDone?: () => any;
    checkParentForHostBinding: boolean;
}
