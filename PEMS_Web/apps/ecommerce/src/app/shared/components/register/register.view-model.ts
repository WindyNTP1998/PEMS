import { cloneDeep, immutableUpdate, PlatformFormMode, PlatformVm } from '@pem/platform-core';
import { Gender } from '../../constants/gender.enum';

export class RegisterModel {
	public email: string = '';
	public password: string = '';
	public confirmPassword: string = '';
	public firstName: string = '';
	public lastName: string = '';
	public dateOfBirth: Date = new Date();
	public gender: Gender = Gender.Male;
	
	constructor(data?: Partial<RegisterModel>) {
		if (data == undefined) return;
		if (data.email != undefined) this.email = data.email;
		if (data.password != undefined) this.password = data.password;
		if (data.confirmPassword != undefined) this.confirmPassword = data.confirmPassword;
		if (data.firstName != undefined) this.firstName = data.firstName;
		if (data.lastName != undefined) this.lastName = data.lastName;
		if (data.dateOfBirth != undefined) this.dateOfBirth = data.dateOfBirth;
	}
}

export class RegisterFormVm extends PlatformVm {
	public mode: PlatformFormMode = 'create';
	public registerMode: RegisterModel | undefined = undefined;
	
	constructor(data?: Partial<RegisterFormVm>) {
		super(data);
		if (data == undefined) return;
		if (data.formData != undefined) this.formData = data.formData;
		if (data.mode != undefined) this.mode = data.mode;
		if (data.registerMode != undefined) {
			this.registerMode = data.registerMode;
			this._formData = cloneDeep(data.registerMode);
		}
	}
	
	private _formData: Partial<RegisterModel> | RegisterModel = {};
	public get formData(): Partial<RegisterModel> | RegisterModel {
		return this._formData;
	}
	
	public set formData(v: Partial<RegisterModel> | RegisterModel) {
		this._formData = v;
	}
	
	public get email(): string | undefined {
		return this.formData.email;
	}
	
	public set email(v: string) {
		this._formData = immutableUpdate(this._formData, p => {
			p.email = v;
		});
	}
	
	public get password(): string | undefined {
		return this.formData.password;
	}
	
	public set password(v: string) {
		this._formData = immutableUpdate(this._formData, p => {
			p.password = v;
		});
	}
	
	public get confirmPassword(): string | undefined {
		return this.formData.confirmPassword;
	}
	
	public set confirmPassword(v: string) {
		this._formData = immutableUpdate(this._formData, p => {
			p.confirmPassword = v;
		});
	}
	
	public get firstName(): string | undefined {
		return this.formData.firstName;
	}
	
	public set firstName(v: string) {
		this._formData = immutableUpdate(this._formData, p => {
			p.firstName = v;
		});
	}
	
	public get lastName(): string | undefined {
		return this.formData.lastName;
	}
	
	public set lastName(v: string) {
		this._formData = immutableUpdate(this._formData, p => {
			p.lastName = v;
		});
	}
	
	public get dateOfBirth(): Date | undefined {
		return this.formData.dateOfBirth;
	}
	
	public set dateOfBirth(v: Date) {
		this._formData = immutableUpdate(this._formData, p => {
			p.dateOfBirth = v;
		});
	}
	
	public get gender(): Gender | undefined {
		return this.formData.gender;
	}
	
	public set gender(v: Gender) {
		this._formData = immutableUpdate(this._formData, p => {
			p.gender = v;
		});
	}
	
	public mapToRequestModel(): RegisterModel {
		return new RegisterModel(this.formData);
	}
	
}