import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Clone the request and add the bearer token header
        if (this.authService.accessToken != null) {
            request = this.authService.addAuthorization(request);
        }

        // Pass the request on to the next handler
        return next.handle(request);
    }
}
