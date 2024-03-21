import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformFormComponent, PlatformFormConfig, validator } from '@pem/platform-core';
import { BravoCommonModule, DialogService, MaterialModule } from '@pem/common';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender, GENDER_DISPLAY } from '../../constants/gender.enum';
import { NgbDatepicker, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../auth/auth.service';
import { RegisterFormVm, RegisterModel } from './register.view-model';
import { HttpErrorResponse } from '@angular/common/http';

export enum RegisterFormValidationKeys {
	required = 'required',
	invalidConfirmPassword = 'invalidConfirmPassword',
	invalidPassword = 'invalidPassword'
}

export interface Error {
	code: string;
	description: string;
}

@Component({
	selector: 'register',
	standalone: true,
	imports: [CommonModule, MaterialModule, BravoCommonModule, NgbDatepicker, NgbInputDatepicker],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends PlatformFormComponent<RegisterFormVm> implements OnInit {
	public registerForm!: FormGroup;
	public Gender = Gender;
	public GENDER_DISPLAY = GENDER_DISPLAY;
	public registerFormValidationKeys = RegisterFormValidationKeys;
	public model!: NgbDateStruct;
	errors!: Error[];
	
	constructor(
		private dialogRef: MatDialogRef<RegisterComponent>,
		private dialogService: DialogService,
		private cRef: ChangeDetectorRef,
		private authService: AuthService)
	{
		super();
	}
	
	public override ngOnInit() {
		super.ngOnInit();
	}
	
	public register() {
		this.authService.register(this.vm().mapToRequestModel())
			.subscribe((result) => {
					this.toast.success('Register successfully');
					this.dialogRef.close();
				},
				(errors: HttpErrorResponse) => {
					if (errors!.status === 400) {
						this.errors = errors.error as Error[];
						this.cRef.detectChanges();
						this.toast.error('Register failed');
					}
				}
			);
	}
	
	public matchPasswordValidator(
		errorKey: string,
		passwordFn: (control: FormControl) => string,
		confirmPWFn: (control: FormControl) => string,
		condition?: (control: FormControl) => boolean
	)
	{
		return validator((control: AbstractControl) => {
			if (condition != null && !condition(<FormControl>control)) {
				return null;
			}
			const password = passwordFn(<FormControl>control);
			const confirmPassword = confirmPWFn(<FormControl>control);
			
			if (password !== confirmPassword) {
				return { [errorKey]: true };
			}
			else return null;
		});
	}
	
	protected onInitVm = () => {
		return new RegisterFormVm({
			mode: this.mode,
			registerMode: new RegisterModel()
		});
	};
	
	protected initialFormConfig = (): PlatformFormConfig<RegisterFormVm> => {
		return {
			controls: {
				email: new FormControl(this.vm().email, [Validators.required, Validators.email]),
				password: new FormControl(this.vm().password, [
					Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{6,}$'),
					
					this.matchPasswordValidator(
						RegisterFormValidationKeys.invalidConfirmPassword,
						() => this.vm().confirmPassword!,
						control => control.value,
						control =>
							control.value !== '' && this.vm().confirmPassword !== ''),
					Validators.required
				]),
				confirmPassword: new FormControl(this.vm().confirmPassword, [
					Validators.required,
					this.matchPasswordValidator(
						RegisterFormValidationKeys.invalidConfirmPassword,
						() => this.vm().password!,
						control => control.value,
						control =>
							control.value !== '' && this.vm().password !== '')
				]),
				firstName: new FormControl(this.vm().firstName, [Validators.required]),
				lastName: new FormControl(this.vm().lastName, [Validators.required]),
				dateOfBirth: new FormControl(this.vm().dateOfBirth, [Validators.required]),
				gender: new FormControl(this.vm().gender, [Validators.required])
			},
			afterInit: () => {
				this.form.markAsUntouched();
			},
			groupValidations: [['password', 'confirmPassword']]
		};
	};
	
}
