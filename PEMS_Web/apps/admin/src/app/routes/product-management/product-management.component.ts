import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformCoreModule, PlatformVmStoreComponent } from '@pem/platform-core';
import { ProductManagementState, ProductManagementStore } from './product-management.state';
import { ProductTableComponent } from '../../shared/components/product-table/product-table.component';
import { MatButton } from '@angular/material/button';
import { DialogService } from '@pem/common';
import { ProductDetailComponent } from '../../shared/components/product-detail/product-detail.component';

@Component({
    selector: 'product-management',
    standalone: true,
    imports: [CommonModule, ProductTableComponent, PlatformCoreModule, MatButton],
    templateUrl: './product-management.component.html',
    styleUrl: './product-management.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManagementComponent
    extends PlatformVmStoreComponent<ProductManagementState, ProductManagementStore>
    implements OnInit
{
    public searchText: string = '';

    constructor(
        store: ProductManagementStore,
        private dialogService: DialogService
    ) {
        super(store);
    }

    public override ngOnInit() {
        super.ngOnInit();
    }

    public startSearch() {
        console.log(this.searchText);
    }

    public clearSearchText() {
        this.searchText = '';
    }

    public onClickAddProduct() {
        this.dialogService.openDialog(
            ProductDetailComponent,
            {},
            {
                autoFocus: false,
                disableClose: true,
                closeOn$: this.destroyed$
            }
        );
    }
}
