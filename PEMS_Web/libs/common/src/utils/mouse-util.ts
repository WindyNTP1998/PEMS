// import { fromEvent, Subscription } from 'rxjs';
//
// import { BravoDateUtil } from './date-util';
// import { BravoProcessUtil } from './process-util';
//
// export class BravoMouseUtil {
//     private static _minDistanceToStateThatMouseMoved = 2;
//     public static commonWaitForDbClickDelayTime = 300;
//
//     public static isMousePositionChanged(mousedownEvent: MouseEvent, mouseMoveEvent: MouseEvent) {
//         return (
//             Math.abs(mousedownEvent.x - mouseMoveEvent.x) > BravoMouseUtil._minDistanceToStateThatMouseMoved ||
//             Math.abs(mousedownEvent.y - mouseMoveEvent.y) > BravoMouseUtil._minDistanceToStateThatMouseMoved
//         );
//     }
//
//     public static isTouchPositionChanged(touchStartEvent: TouchEvent, touchEndEvent: TouchEvent) {
//         return (
//             Math.abs(touchStartEvent.touches[0].clientX - touchEndEvent.changedTouches[0].clientX) >=
//                 BravoMouseUtil._minDistanceToStateThatMouseMoved ||
//             Math.abs(touchStartEvent.touches[0].clientY - touchEndEvent.changedTouches[0].clientY) >=
//                 BravoMouseUtil._minDistanceToStateThatMouseMoved
//         );
//     }
//
//     public static createClickOnlyCheckContext(
//         targetElement: () => HTMLElement | undefined
//     ): BravoMouseUtilClickOnlyCheckContext {
//         return new BravoMouseUtilClickOnlyCheckContext(targetElement);
//     }
// }
//
// export enum MouseWhich {
//     LeftClick = 1,
//     MiddleClick = 2,
//     RightClick = 3
// }
//
// export class BravoMouseUtilClickOnlyCheckContext {
//     constructor(
//         public targetElement: () => HTMLElement | undefined,
//         public onClickedOnly?: (e: Event) => any,
//         public onDblClickedOnly?: (e: Event) => any
//     ) {}
//
//     private _onDbClickSubs: Subscription = new Subscription();
//     private _onMouseDownSubs: Subscription = new Subscription();
//     private _onMouseUpSubs: Subscription = new Subscription();
//     private _onTouchStartSubs: Subscription = new Subscription();
//     private _onTouchEndSubs: Subscription = new Subscription();
//     private _waitForSecondDoubleTouchSubs: Subscription | undefined;
//     private _callOnDblClickedOnlyDelaySubs: Subscription | undefined;
//     private _lastMouseDownEvent?: MouseEvent;
//     private _lastMouseUpEvent?: MouseEvent;
//     private _lastTouchStartEvent?: TouchEvent;
//     private _lastTouchEndEvent?: TouchEvent;
//     private _lastMouseDownTime: Date | undefined;
//     private _lastTouchStartTime: Date | undefined;
//
//     public subscribe() {
//         this.unsubscribe();
//         const targetElement = this.targetElement();
//         if (targetElement != undefined) {
//             this._onMouseDownSubs = fromEvent(targetElement, 'mousedown').subscribe((e: MouseEvent) => {
//                 this._lastTouchStartEvent = undefined;
//                 this._lastMouseDownEvent = e;
//                 this._lastMouseDownTime = new Date();
//                 if (this._callOnDblClickedOnlyDelaySubs != undefined) this._callOnDblClickedOnlyDelaySubs.unsubscribe();
//             });
//             this._onMouseUpSubs = fromEvent(targetElement, 'mouseup').subscribe((e: MouseEvent) => {
//                 this._lastMouseUpEvent = e;
//                 if (
//                     this._lastMouseDownTime != undefined &&
//                     BravoDateUtil.diff(new Date(), this._lastMouseDownTime) <
//                         BravoMouseUtil.commonWaitForDbClickDelayTime
//                 ) {
//                     this._callOnClickedOnly(e);
//                 }
//             });
//
//             this._onDbClickSubs = fromEvent(targetElement, 'dblclick').subscribe((e: MouseEvent) => {
//                 if (this.onDblClickedOnly != undefined) this.onDblClickedOnly(e);
//                 if (this._callOnDblClickedOnlyDelaySubs != undefined) this._callOnDblClickedOnlyDelaySubs.unsubscribe();
//             });
//
//             this._onTouchStartSubs = fromEvent(targetElement, 'touchstart').subscribe((e: TouchEvent) => {
//                 const wasLastTouchNotScrolling = this.wasLastClickedOrTouchOnly();
//                 this._lastMouseDownEvent = undefined;
//                 this._lastTouchStartEvent = e;
//                 const isThisTouchNotMovedComparedToLastTouch = this.wasLastClickedOrTouchOnly();
//                 this._lastTouchStartTime = new Date();
//                 if (this._callOnDblClickedOnlyDelaySubs != undefined) this._callOnDblClickedOnlyDelaySubs.unsubscribe();
//
//                 if (this._waitForSecondDoubleTouchSubs == undefined) {
//                     this._waitForSecondDoubleTouchSubs = BravoProcessUtil.delay(() => {
//                         this._waitForSecondDoubleTouchSubs = undefined;
//                     }, BravoMouseUtil.commonWaitForDbClickDelayTime);
//                 } else {
//                     this._waitForSecondDoubleTouchSubs.unsubscribe();
//                     this._waitForSecondDoubleTouchSubs = undefined;
//                     if (
//                         this.onDblClickedOnly != undefined &&
//                         wasLastTouchNotScrolling &&
//                         isThisTouchNotMovedComparedToLastTouch
//                     )
//                         this.onDblClickedOnly(e);
//                 }
//             });
//             this._onTouchEndSubs = fromEvent(targetElement, 'touchend').subscribe((e: TouchEvent) => {
//                 this._lastMouseUpEvent = undefined;
//                 this._lastTouchEndEvent = e;
//                 if (
//                     this._lastTouchStartTime != undefined &&
//                     BravoDateUtil.diff(new Date(), this._lastTouchStartTime) <
//                         BravoMouseUtil.commonWaitForDbClickDelayTime
//                 ) {
//                     this._callOnClickedOnly(e);
//                 }
//             });
//         }
//     }
//
//     public unsubscribe() {
//         this._onMouseDownSubs.unsubscribe();
//         this._onMouseUpSubs.unsubscribe();
//         this._onTouchStartSubs.unsubscribe();
//         this._onTouchEndSubs.unsubscribe();
//         this._onDbClickSubs.unsubscribe();
//     }
//
//     public wasLastClickedOrTouchOnly(): boolean {
//         if (
//             this._lastTouchStartEvent != undefined &&
//             this._lastTouchEndEvent != undefined &&
//             !BravoMouseUtil.isTouchPositionChanged(this._lastTouchStartEvent, this._lastTouchEndEvent)
//         ) {
//             return true;
//         }
//         if (
//             this._lastMouseDownEvent != undefined &&
//             this._lastMouseUpEvent != undefined &&
//             this._lastMouseDownEvent.which == MouseWhich.LeftClick &&
//             !BravoMouseUtil.isMousePositionChanged(this._lastMouseDownEvent, this._lastMouseUpEvent)
//         ) {
//             return true;
//         }
//         return false;
//     }
//
//     private _callOnClickedOnly(e: Event) {
//         if (this._callOnDblClickedOnlyDelaySubs != undefined) this._callOnDblClickedOnlyDelaySubs.unsubscribe();
//         if (this.onClickedOnly != undefined && this.wasLastClickedOrTouchOnly()) {
//             this._callOnDblClickedOnlyDelaySubs = BravoProcessUtil.delay(() => {
//                 if (this.onClickedOnly != undefined) this.onClickedOnly(e);
//                 this._callOnDblClickedOnlyDelaySubs = undefined;
//             }, BravoMouseUtil.commonWaitForDbClickDelayTime);
//         }
//     }
// }
