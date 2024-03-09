import { HttpClient, HttpRequest } from '@angular/common/http';
import { AccountApiService } from '../../../../../libs/domain/src/account';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public accessToken: string | null = localStorage.getItem(this.tokenKey);

    constructor(private httpClient: HttpClient, private accountApi: AccountApiService) {

    }

    public get tokenType() {
        return 'Bearer';
    }

    public get tokenKey() {
        return 'access_token';
    }

    public login(email: string, password: string) {
        return this
            .accountApi
            .login({ email, password })
            .subscribe((response) => {
                this.accessToken = response.token ?? '';
                localStorage.setItem(this.tokenKey, this.accessToken);
            });
    }

    public addAuthorization(request: HttpRequest<unknown>) {
        return request.clone({
            setHeaders: {
                Authorization: `${this.tokenType} ${this.accessToken}`
            }
        });
    }
}
