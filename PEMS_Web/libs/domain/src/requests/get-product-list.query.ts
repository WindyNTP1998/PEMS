import { PlatformPagedQueryDto } from '@pem/platform-core';

export class GetProductListQuery extends PlatformPagedQueryDto {
    public brandIds?: string[];
    public categoryIds?: string[];
    public searchText?: string;
    public withBrand?: boolean;
    public withCategories?: boolean;

    constructor(data?: Partial<GetProductListQuery>) {
        super(data);
        if (data == undefined) return;
        if (data.brandIds != undefined) this.brandIds = data.brandIds;
        if (data.categoryIds != undefined) this.categoryIds = data.categoryIds;
        if (data.searchText != undefined) this.searchText = data.searchText;
        if (data.withBrand != undefined) this.withBrand = data.withBrand;
        if (data.withCategories != undefined) this.withCategories = data.withCategories;
    }
}
