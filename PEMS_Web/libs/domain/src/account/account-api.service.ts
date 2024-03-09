import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../../apps/ecommerce/src/app/app.config';
import { PlatformApiService } from '@pem/platform-core';
import { AuthResponse, LoginRequest } from './request';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountApiService extends PlatformApiService {
    public authorityUrl = inject(BASE_URL);

    protected get apiUrl(): string {
        return this.authorityUrl + '/api';
    }

    public login(request: LoginRequest) {
        return this.http.post<AuthResponse>(`${this.apiUrl}/account/login`, request).pipe(
            map(response => {
                return new AuthResponse(response);
            })
        );
    }
}
