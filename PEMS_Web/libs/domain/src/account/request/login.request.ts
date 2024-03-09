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
    public IsSuccess: boolean = false;
    public message?: string;

    constructor(response?: Partial<AuthResponse>) {
        if (response == undefined) return;
        if (response.token != undefined) this.token = response.token;
        if (response.IsSuccess != undefined) this.IsSuccess = response.IsSuccess;
        if (response.message != undefined) this.message = response.message;
    }
}
