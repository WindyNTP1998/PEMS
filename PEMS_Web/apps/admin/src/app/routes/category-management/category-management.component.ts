import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CategoryTableComponent} from '../../shared/components/category-table/category-table.component';

import {PlatformVmStoreComponent} from '@pem/platform-core';
import {CategoryManagementState, CategoryManagementStoreStore} from './category-management.state';
import {BravoCommonModule, DialogService} from '@pem/common';
import {CategoryDetailComponent} from '../../shared/components/category-detail/category-detail.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TablePaginationComponent} from "@pem/domain";

@Component({
    selector: 'category-management',
    standalone: true,
    imports: [CommonModule, MatButton, MatIcon, CategoryTableComponent, BravoCommonModule, MatProgressSpinner, TablePaginationComponent],
    templateUrl: './category-management.component.html',
    styleUrl: './category-management.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryManagementComponent
    extends PlatformVmStoreComponent<CategoryManagementState, CategoryManagementStoreStore> {
    constructor(
        store: CategoryManagementStoreStore,
        private dialogService: DialogService
    ) {
        super(store);
    }

    public onClickAddCategory = () => {
        this.dialogService.openDialog(
            CategoryDetailComponent,
            {mode: 'create'},
            {
                autoFocus: false,
                disableClose: true,
                closeOn$: this.destroyed$
            })
            .subscribe((ok: boolean) => {
                if (!ok) return;

                this.store.reloadOrInitData();
            });
    };

    public onPageChange(pageNumber: number): void {
        this.store.setPageIndex(pageNumber - 1);
    }
}
