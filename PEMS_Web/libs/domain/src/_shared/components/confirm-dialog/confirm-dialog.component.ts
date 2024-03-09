import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from '@pem/platform-core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'confirm-dialog',
	standalone: true,
	imports: [CommonModule, MatButton],
	templateUrl: './confirm-dialog.component.html',
	styleUrl: './confirm-dialog.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent extends PlatformComponent implements OnInit {
	@Input() public title: string = '';
	@Input() public confirmMessage: string = '';
	
	constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {super();}
	
	public override ngOnInit() {
		super.ngOnInit();
	}
	
	public onClickNoOrClose() {
		this.dialogRef.close();
	}
	
	public onConfirm() {
		this.dialogRef.close(true);
	}
}
