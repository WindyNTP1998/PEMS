import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from '@pem/platform-core';
import { Product } from '@pem/domain';
import { IPageInfo } from '../../../../../../../libs/common/src/ui-model/table.model';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';
import { MaterialModule } from '@pem/common';

@Component({
    selector: 'product-table',
    standalone: true,
    imports: [
        CommonModule,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        MatColumnDef,
        MatCell,
        MatCellDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MaterialModule
    ],
    templateUrl: './product-table.component.html',
    styleUrl: './product-table.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableComponent extends PlatformComponent implements OnInit {
    @Input() public products: Product[] = [];
    @Input() public pageInfo: IPageInfo = { pageIndex: 0, pageSize: 0, totalItems: 0, totalPages: 0 };
    @Input() public isLoading: boolean = false;

    public displayedColumns: string[] = ['check', 'code', 'name', 'category', 'image', 'price', 'actions'];
    public readonly gridTemplateColumns: string = '72px 14% 22% 14% 20% 15% 15%';

    public override ngOnInit() {
        super.ngOnInit();
    }

    public editProduct(element: Product) {}

    public deleteProduct(element: Product) {}
}
