import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from '@pem/platform-core';
import { BravoCommonModule, DialogService, MaterialModule } from '@pem/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'login',
	standalone: true,
	imports: [CommonModule, MaterialModule, BravoCommonModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends PlatformComponent {
	
	constructor(
		private dialogRef: MatDialogRef<LoginComponent>,
		private dialogService: DialogService)
	{
		super();
	}
	
	public onClickLogin() {
		console.log('Login clicked');
	}
	
	public onClickRegister() {
		this.dialogRef.close({ action: 'register' });
	}
	
	public onclickForgotPassword() {
		this.dialogRef.close({ action: 'forgotPassword' });
	}
}
