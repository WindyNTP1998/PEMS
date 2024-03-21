import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public accessToken: string | null = localStorage.getItem(this.tokenKey);
    public authorityUrl = inject(BASE_URL);

    constructor(protected http: HttpClient) {
    }

    public get tokenType() {
        return 'Bearer';
    }

    public get tokenKey() {
        return 'access_token';
    }

    protected get apiUrl(): string {
        return this.authorityUrl + '/api';
    }

    public login(email: string, password: string) {
        return this.http
            .post<AuthResponse>(`${this.apiUrl}/account/login`, { email, password })
            .subscribe((response) => {
                this.accessToken = response.token ?? '';
                localStorage.setItem(this.tokenKey, this.accessToken!);
            });
    }
}

export class LoginRequest {
    public email!: string;
    public password!: string;

    constructor(request?: Partial<LoginRequest>) {
        if (request == undefined) return;
        if (request.email != undefined) this.email = request.email;
        if (request.password != undefined) this.password = request.password;
    }
}

export class AuthResponse {
    public token?: string;
    public isSuccess?: boolean;
    public message?: string;

    constructor(response?: Partial<AuthResponse>) {
        if (response == undefined) return;
        if (response.token != undefined) this.token = response.token;
        if (response.isSuccess != undefined) this.isSuccess = response.isSuccess;
        if (response.message != undefined) this.message = response.message;
    }
}
