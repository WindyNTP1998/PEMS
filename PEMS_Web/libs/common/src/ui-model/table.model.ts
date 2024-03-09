import { TemplateRef } from '@angular/core';

export interface TableOptions {
    pageSize: number;
    pageIndex: number;
    showTotalPages: number;
    totalItems: number;
    displayCheckBox?: boolean;
    showFirstLastButtons?: boolean;
    maxWidthCheckBox?: string;
    stickyHeader?: boolean;
    allowPagination?: boolean;
    showDataNotFound?: boolean;
    dataNotFoundText?: string;
}

export interface TableHeader {
    uniqueColumnId: string;
    fieldName?: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellTemplate?: TemplateRef<any>;
    maxWidthCell?: string;
    minWidthCell?: string;
    centerItem?: boolean;
    fieldItemIndex?: number;
    click?: (index: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headerTemplate?: TemplateRef<any>;
}

export interface IPage {
    pageIndex: number;
    length: number;
    pageSize: number;
    previousPageIndex: number;
}

export interface IPageInfo {
    pageSize: number;
    totalItems: number;
    pageIndex: number;
    totalPages: number;
}

export const THROTTLE_MAX_ITEMS = 1000;
