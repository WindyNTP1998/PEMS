import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BravoCommonModuleConfig, defaultBravoCommonModuleConfig } from './bravo-common-module.config';
import { BravoDynamicComponentService } from './services/dynamic-component.service';
import { DialogService } from './components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,
        MatDialogModule
    ],
    declarations: [],
    providers: [
        // These services must be new instance per modules
        BravoDynamicComponentService
    ]
})
export class BravoCommonRootModule {
    public static forRoot(config?: Partial<BravoCommonModuleConfig>): ModuleWithProviders<BravoCommonRootModule> {
        return {
            ngModule: BravoCommonRootModule,
            providers: [
                { provide: FOR_ROOT_CONFIG_TOKEN, useValue: config },
                {
                    provide: BravoCommonModuleConfig,
                    useFactory: bravoCommonModuleConfigFactory,
                    deps: [FOR_ROOT_CONFIG_TOKEN]
                },

                DialogService
                //BravoStripeService,
                // BravoPaymentService,
                // BravoTranslateService,
                // BravoScriptService,
                // ServiceWorkerService
            ]
        };
    }
}

export function bravoCommonModuleConfigFactory(config?: Partial<BravoCommonModuleConfig>) {
    const userConfigValue = config != undefined ? config : {};
    return { ...defaultBravoCommonModuleConfig, userConfigValue };
}

export const FOR_ROOT_CONFIG_TOKEN = new InjectionToken<Partial<BravoCommonModuleConfig>>('forRoot() module config.');
