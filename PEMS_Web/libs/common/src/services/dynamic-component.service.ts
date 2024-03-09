import { ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { assign } from '../utils/object-util';
import { Dictionary } from '../typings';

@Injectable()
export class BravoDynamicComponentService {
    constructor(
        public resolver: ComponentFactoryResolver,
        public injector: Injector
    ) {
    }

    public createComponentRef<TComponent, TInput>(
        componentType: Type<TComponent>,
        inputs?: TInput,
        viewContainer?: ViewContainerRef
    ): ComponentRef<TComponent> {
        const componentFactory = this.resolver.resolveComponentFactory(componentType);
        const componentRef =
            viewContainer != undefined
            ? viewContainer.createComponent(componentFactory)
            : componentFactory.create(this.injector);
        if (inputs != undefined) assign(<object>componentRef.instance, <object>inputs);
        componentRef.changeDetectorRef.detectChanges();
        return componentRef;
    }

    public createComponentRefWithHiddenContainer<TComponent, TInput>(
        componentType: Type<TComponent>,
        inputs?: TInput
    ): { componentRef: ComponentRef<TComponent>; componentContainer: HTMLElement } {
        const componentRef = this.createComponentRef(componentType, inputs);

        const componentContainer = document.createElement('div');
        componentContainer.style.position = 'fixed';
        componentContainer.style.top = '100%';
        componentContainer.style.visibility = 'hidden';
        componentContainer.style.zIndex = '-1';
        componentContainer.style.pointerEvents = 'none';
        componentContainer.style.maxWidth = '100%';
        componentContainer.style.width = '100%';
        componentContainer.style.overflow = 'visible';
        componentContainer.style.display = 'flex';
        componentContainer.style.flexDirection = 'column';
        document.body.appendChild(componentContainer);
        componentContainer.appendChild(this.getComponentRefRootElement(componentRef));

        const prevNgOnDestroy: undefined | (() => unknown) = (<Dictionary<any>>componentRef.instance)['ngOnDestroy'];
        (<Dictionary<any>>componentRef.instance)['ngOnDestroy'] = (() => {
            if (prevNgOnDestroy != undefined) prevNgOnDestroy.bind(componentRef.instance)();
            componentContainer.remove();
        }).bind(componentRef.instance);
        return {
            componentRef,
            componentContainer
        };
    }

    public getComponentRefRootElement<T>(componentRef: ComponentRef<T>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<T>).rootNodes[0] as HTMLElement;
    }

    public detroyComponentRef<T>(componentRef: ComponentRef<T>) {
        componentRef.destroy();
        componentRef.hostView.destroy();
        this.getComponentRefRootElement(componentRef).remove();
    }
}
