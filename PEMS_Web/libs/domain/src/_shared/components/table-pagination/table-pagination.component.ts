import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {immutableUpdate, PlatformComponent} from "@pem/platform-core";
import {IPageInfo} from "../../../../../common/src/ui-model/table.model";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
    selector: 'table-pagination',
    standalone: true,
    imports: [CommonModule, NgxPaginationModule],
    templateUrl: './table-pagination.component.html',
    styleUrl: './table-pagination.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePaginationComponent extends PlatformComponent {
    @Input() public pageInfo: IPageInfo = {pageIndex: 0, pageSize: 0, totalPages: 0, totalItems: 0};
    @Input() public items: unknown[] = [];
    @Output('pageChangeEventEmitter') public pageChangeEventEmitter: EventEmitter<number> = new EventEmitter<number>();

    public onPageChange(pageIndex: number): void {
        this.pageInfo = immutableUpdate(this.pageInfo, {pageIndex: pageIndex});
        this.pageChangeEventEmitter.emit(pageIndex);
    }
}
