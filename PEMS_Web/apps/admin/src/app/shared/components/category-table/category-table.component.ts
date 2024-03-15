import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from '@pem/platform-core';
import { Category, CategoryApiService, ConfirmDialogComponent } from '@pem/domain';
import { IPageInfo } from '../../../../../../../libs/common/src/ui-model/table.model';
import { CdkDropList } from '@angular/cdk/drag-drop';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatNoDataRow,
	MatRow,
	MatRowDef,
	MatTable
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DialogService } from '@pem/common';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
	selector: 'category-table',
	standalone: true,
	imports: [
		CommonModule, CdkDropList, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatHeaderRow,
		MatRow, MatRowDef, MatIcon, MatIconButton, MatProgressSpinner, MatNoDataRow],
	templateUrl: './category-table.component.html',
	styleUrl: './category-table.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTableComponent extends PlatformComponent {
	@Input() public categories: Category[] = [];
	@Input() public pageInfo: IPageInfo = { pageIndex: 0, pageSize: 0, totalItems: 0, totalPages: 0 };
	@Input() public isLoading: boolean = false;
	@Output() public requiredReloadEventChange: EventEmitter<void> = new EventEmitter<void>();
	
	displayedColumns: string[] = ['name', 'slug', 'categoryImageUrl', 'parentId', 'action'];
	
	constructor(private dialogService: DialogService, private categoryApiService: CategoryApiService) {super();}
	
	public onClickUpdateCategory(categoryId: string) {
		this.dialogService.openDialog(
			CategoryDetailComponent,
			{ mode: 'update', categoryId: categoryId },
			{
				autoFocus: false,
				disableClose: true,
				closeOn$: this.destroyed$
			})
		    .subscribe((ok: boolean) => {
			    if (!ok) return;
			    
			    this.requiredReloadEventChange.emit();
		    });
	}
	
	public onClickRemoveCategory(categoryId: string) {
		this.dialogService.openDialog(
			ConfirmDialogComponent,
			{
				confirmMessage: 'Are you sure you want to delete this category?',
				title: 'Delete Category'
			},
			{
				autoFocus: false,
				disableClose: false,
				closeOn$: this.destroyed$
			}
		).subscribe((ok: boolean) => {
			if (!ok) return;
			
			this.categoryApiService
			    .deleteCategory(categoryId)
			    .pipe(
				    this.tapResponse(() => {
					    this.toast.success('Delete category successfully!');
					    
				    }, () => {
					    this.toast.error('Delete category failed!');
					    
				    }, () => {
					    this.dialogService.closeLastCurrentDialog();
				    })
			    )
			    .subscribe(() => {
				    this.requiredReloadEventChange.emit();
			    });
		});
	}
}
