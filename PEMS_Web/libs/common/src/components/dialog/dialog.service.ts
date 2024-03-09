import { Injectable, NgZone } from '@angular/core';
import { BravoDialogConfigs } from './dialog-config';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { filter, Observable, take } from 'rxjs';

@Injectable()
export class DialogService {
    public currentDialogsRef: MatDialogRef<any>[] = [];

    constructor(
        private _matDialogSvc: MatDialog,
        private _ngZone: NgZone
    ) {
    }

    public static get defaultDialogConfigs(): BravoDialogConfigs {
        return {
            maxWidth: '95vw',
            maxHeight: '95vh',
            padding: '0px'
        };
    }

    public openDialog<T, InputT extends Partial<T> = Partial<T>>(
        component: ComponentType<T>,
        inputs?: InputT,
        configs?: BravoDialogConfigs
    ): Observable<any> {
        const dialogRef = this.openDialogRef(component, inputs, configs);
        return dialogRef.afterClosed();
    }

    public openDialogRef<T, InputT extends Partial<T>>(
        component: ComponentType<T>,
        inputs?: InputT,
        configs?: BravoDialogConfigs
    ): MatDialogRef<T, any> {
        return this._ngZone.run(() => {
            const finalConfigs = { ...DialogService.defaultDialogConfigs, ...configs };
            const dialogRef = this._matDialogSvc.open<T>(component, finalConfigs);
            this.currentDialogsRef.push(dialogRef);
            if (inputs != undefined) {
                this._assignInputsData(dialogRef, inputs);
            }
            const dialogContainerElement = this.getDialogContainerElement(dialogRef);
            dialogContainerElement.style.display = 'flex';
            dialogContainerElement.style.flexDirection = 'column';
            dialogContainerElement.style.overflow = 'visible';
            dialogContainerElement.style.padding =
                configs != undefined && configs.padding != undefined ? configs.padding : '0px';

            if (configs?.closeOn$ != null) {
                configs.closeOn$
                    .pipe(
                        filter(_ => _ == true || _ == null),
                        take(1)
                    )
                    .subscribe(() => {
                        this.closeDialog(dialogRef);
                    });
            }
            return dialogRef;
        });
    }

    // public openConfirmDialogRef(
    //     inputs?: BravoConfirmDialogComponentInputs,
    //     configs?: BravoDialogConfigs
    // ): MatDialogRef<BravoConfirmDialogComponent> {
    //     return this._ngZone.run(() => {
    //         if (inputs == undefined) {
    //             inputs = {};
    //         }
    //         const finalConfigs = { ...BravoConfirmDialogComponent.dialogConfigs, ...configs };
    //         const dialogRef = this.openDialogRef(BravoConfirmDialogComponent, inputs, finalConfigs);
    //
    //         const userOnConfirm = inputs.onConfirm;
    //         const userConfirmRequest = inputs.confirmRequest;
    //         inputs.onConfirm = ((result: boolean) => {
    //             if (userOnConfirm != undefined) userOnConfirm(result);
    //             if (userConfirmRequest == undefined || result == false) this.closeDialog(dialogRef, result);
    //         }).bind(this);
    //
    //         const userOnClose = inputs.onClose;
    //         inputs.onClose = (() => {
    //             if (userOnClose != undefined) userOnClose();
    //             this.closeDialog(dialogRef, false);
    //         }).bind(this);
    //         this._assignInputsData(dialogRef, inputs);
    //
    //         if (configs?.closeOn$ != null) {
    //             configs.closeOn$
    //                 .pipe(
    //                     filter(_ => _ == true || _ == null),
    //                     take(1)
    //                 )
    //                 .subscribe(() => {
    //                     this.closeDialog(dialogRef, false);
    //                 });
    //         }
    //
    //         return dialogRef;
    //     });
    // }
    //
    // public openConfirmDialog(
    //     inputs?: BravoConfirmDialogComponentInputs,
    //     configs?: BravoDialogConfigs
    // ): Observable<boolean> {
    //     return this.openConfirmDialogRef(inputs, configs).afterClosed();
    // }
    //
    public closeLastCurrentDialog(dialogResult?: any) {
        return this._ngZone.run(() => {
            const lastCurrentDialogRef = this.currentDialogsRef.pop();
            if (lastCurrentDialogRef == undefined) return;
            lastCurrentDialogRef.close(dialogResult);
        });
    }

    public closeAllDialogs() {
        return this._ngZone.run(() => {
            this.currentDialogsRef.forEach(p => {
                p.close();
            });
            this.currentDialogsRef = [];
        });
    }

    public closeDialog(dialogRef: MatDialogRef<any>, dialogResult?: any) {
        return this._ngZone.run(() => {
            const newCurrentDialogsRef: MatDialogRef<any>[] = [];
            this.currentDialogsRef.forEach(p => {
                if (p == dialogRef) {
                    p.close(dialogResult);
                } else {
                    newCurrentDialogsRef.push(p);
                }
            });
            this.currentDialogsRef = newCurrentDialogsRef;
        });
    }

    public getDialogContainerElement(dialogRef: MatDialogRef<any, any>): HTMLElement {
        return (<any>dialogRef)._containerInstance._elementRef.nativeElement;
    }

    private _assignInputsData(dialogRef: MatDialogRef<any>, inputs: any) {
        const sourceProperties = Object.getOwnPropertyNames(inputs);
        sourceProperties.forEach(prop => {
            const propValue = (<any>inputs)[prop];
            if (propValue != undefined) {
                dialogRef.componentInstance[prop] = propValue;
            }
        });
    }
}
