import { PlatformApiErrorEvent, PlatformApiErrorEventHandler } from '@pem/platform-core';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { NAVIGATION_ROUTES } from '../route.const';
import { Injectable } from '@angular/core';

@Injectable()
export class NoPermissionApiErrorEventHandler extends PlatformApiErrorEventHandler {
    constructor(protected router: Router) {
        super();
    }

    public handle(event: PlatformApiErrorEvent): void {
        if (
            event.apiError.statusCode == HttpStatusCode.Unauthorized ||
            event.apiError.statusCode == HttpStatusCode.Forbidden
        ) {
            this.router.navigate([NAVIGATION_ROUTES.NO_PERMISSION_ERROR], {
                queryParams: this.getQueryParams(event)
            });
        }
    }

    private getQueryParams(event: PlatformApiErrorEvent) {
        switch (event.apiError.error.message) {
            case `You don't have permission to access this check in.`:
                return {
                    message: event.apiError.error.message,
                    btnBackUrl: `./` //URL here
                };
            default:
                return {};
        }
    }
}
