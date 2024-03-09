/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { asyncScheduler, MonoTypeOperatorFunction, Subject, Subscription } from 'rxjs';
import { takeUntil, tap, throttleTime } from 'rxjs/operators';

import { BravoProcessUtil } from '../utils/process-util';
import { BaseComponent } from './base.component';

@Directive()
export abstract class BaseDirective implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        protected elementRef: ElementRef,
        protected renderer: Renderer2,
        protected changeDetectorRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this._detectChangesThrottle$.pipe(this.untilDestroy()).subscribe();
        this.initiated = true;
    }

    public ngAfterViewInit(): void {
        this.viewInitiated = true;
    }

    public ngOnDestroy(): void {
        this.unsubscribeSubscriptions();
        this.onDestroy$.next(null);
        this.onDestroy$.complete();
        this.initiated = false;
        this.destroyed = true;
    }

    protected get canDetectChanges(): boolean {
        return this.initiated && !this.destroyed;
    }

    public viewInitiated: boolean = false;
    public initiated: boolean = false;
    public destroyed: boolean = false;
    public onDestroy$: Subject<any> = new Subject();
    public untilDestroy<T>(): MonoTypeOperatorFunction<T> {
        return takeUntil(this.onDestroy$);
    }
    public get element(): HTMLElement {
        return this.elementRef.nativeElement;
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
}

interface DetectChangesParams {
    onDone?: () => any;
    checkParentForHostBinding: boolean;
}
