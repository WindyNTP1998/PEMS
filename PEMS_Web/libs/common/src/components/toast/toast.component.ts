import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Toast } from 'ngx-toastr';

@Component({
	selector: '[toast-component]',
	styleUrls: ['./toast.component.scss'],
	template: `
		<button
			*ngIf="options.closeButton"
			(click)="remove()"
			type="button"
			class="toast-close-button"
			aria-label="Close"
		>
			<span aria-hidden="true">&times;</span>
		</button>
		<div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
			{{ title | translate }}
			<ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
		</div>
		<div
			*ngIf="message && options.enableHtml"
			role="alert"
			[class]="options.messageClass"
			[innerHTML]="message | translate"
		></div>
		<div
			*ngIf="message && !options.enableHtml"
			role="alert"
			[class]="options.messageClass"
			[attr.aria-label]="message"
		>
			{{ message | translate }}
		</div>
		<div *ngIf="options.progressBar">
			<div class="toast-progress" [style.width]="width + '%'"></div>
		</div>
	`,
	standalone: true,
	animations: [
		trigger('flyInOut', [
			state('inactive', style({ opacity: 0 })),
			state('active', style({ opacity: 1 })),
			state('removed', style({ opacity: 0 })),
			transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
			transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
		])
	],
	imports: [TranslateModule, CommonModule],
	preserveWhitespaces: false
})
export class TranslatedToastComponent extends Toast {

}
