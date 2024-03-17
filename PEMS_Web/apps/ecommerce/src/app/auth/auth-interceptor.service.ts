import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenType = 'Bearer';
        const tokenKey = 'access_token';

        // Clone the request and add the bearer token header
        if (localStorage.getItem(tokenKey) != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${tokenType} ${tokenKey}`
                }
            });
        }

        // Pass the request on to the next handler
        return next.handle(request);
    }
}
