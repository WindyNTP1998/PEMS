import { ApplicationConfig, importProvidersFrom, InjectionToken, LOCALE_ID } from '@angular/core';
import {
    provideRouter,
    RouterModule,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation
} from '@angular/router';
import { ecommerceRoutes } from './app.routes';
import { environment } from '../environments/environments';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlatformCoreModule, PlatformLanguageItem, PlatformTranslateConfig } from '@pem/platform-core';
import { TranslateLoader } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatedToastComponent } from '../../../../libs/common/src/components/toast/toast.component';
import { AppHttpOptionsConfigService } from '@pem/domain';
import { NoPermissionApiErrorEventHandler } from './events/no-permission.api-error-event-handler';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BravoCommonRootModule } from '@pem/common';
import { MatNativeDateModule } from '@angular/material/core';

export const BASE_URL = new InjectionToken<string>('Base url of ecommerce service');

export function TranslateHttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(ecommerceRoutes, withComponentInputBinding()),

        provideHttpClient(),
        {
            provide: BASE_URL,
            useValue: environment.baseApiUrl
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        { provide: LOCALE_ID, useValue: 'en-GB' },
        provideRouter(ecommerceRoutes, withEnabledBlockingInitialNavigation()),
        importProvidersFrom(
            // ServiceWorkerModule.register('ngsw-worker.js', {
            //     enabled: environment.enableServiceWorker
            // }),
            BrowserAnimationsModule,
            PlatformCoreModule.forRoot({
                translate: {
                    platformConfig: new PlatformTranslateConfig({
                        defaultLanguage: 'en',
                        slowRequestBreakpoint: 500,
                        availableLangs: [
                            new PlatformLanguageItem('English', 'en', 'ENG'),
                            new PlatformLanguageItem('Vietnamese', 'vi', 'VN')
                        ]
                    }),
                    config: {
                        loader: {
                            provide: TranslateLoader,
                            useFactory: TranslateHttpLoaderFactory,
                            deps: [HttpClient]
                        }
                    }
                },
                toastConfig: {
                    newestOnTop: true,
                    positionClass: 'toast-bottom-right',
                    preventDuplicates: true,
                    enableHtml: true,
                    toastComponent: TranslatedToastComponent
                },
                httpOptionsConfigService: AppHttpOptionsConfigService,
                appApiErrorEventHandlers: [NoPermissionApiErrorEventHandler]
            }),
            RouterModule.forRoot(ecommerceRoutes, { bindToComponentInputs: true }),
            BrowserAnimationsModule,
            BravoCommonRootModule.forRoot({
                defaultLanguage: 'en',
                slowRequestBreakpoint: 500
            }),
            MatNativeDateModule
        )
    ]
};
