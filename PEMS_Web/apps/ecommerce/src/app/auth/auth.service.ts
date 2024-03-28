import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.config';
import { map } from 'rxjs';
import { RegisterModel } from '../shared/components/register/register.view-model';
import { jwtDecode } from 'jwt-decode';
import { immutableUpdate } from '@pem/platform-core';

@Injectable({ providedIn: 'root' })
export class AuthService {
	public accessToken: string | null = localStorage.getItem(this.tokenKey);
	public authorityUrl = inject(BASE_URL);
	public loggedUser?: LoggedInUserInfo;
	
	constructor(private httpClient: HttpClient, protected http: HttpClient) {
	
	}
	
	public get tokenType() {
		return 'Bearer';
	}
	
	public get tokenKey() {
		return 'access_token';
	}
	
	public get userFullName() {
		return this.getUserData()?.fullName ?? '';
	}
	
	protected get apiUrl(): string {
		return this.authorityUrl + '/api';
	}
	
	public getUserData() {
		const token = this.getToken();
		if (!token) return null;
		const decodedToken: any = jwtDecode(token);
		
		this.loggedUser = immutableUpdate(new LoggedInUserInfo(), p => {
			p.id = decodedToken.nameid;
			p.fullName = decodedToken.name;
			p.email = decodedToken.email;
			p.roles = decodedToken.role || [];
		});
		
		return this.loggedUser;
	}
	
	public login(email: string, password: string) {
		return this.http
			.post<AuthResponse>(`${this.apiUrl}/account/login`, { email, password })
			.subscribe((response) => {
				this.accessToken = response.token ?? '';
				localStorage.setItem(this.tokenKey, this.accessToken);
			});
	}
	
	public register(registerRequest: RegisterModel) {
		return this.http.post<AuthResponse>(`${this.apiUrl}/account/register`, registerRequest)
			.pipe(map(result => new AuthResponse(result)));
	}
	
	private getToken = (): string | null =>
		localStorage.getItem(this.tokenKey) || '';
}

export class LoggedInUserInfo {
	public id?: string;
	public fullName?: string;
	public email?: string;
	public roles?: string[];
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

export class RegisterRequest {
	public email!: string;
	public password!: string;
	public firstName!: string;
	public lastName!: string;
	public dateOfBirth!: Date;
}
