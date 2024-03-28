import { PlatformPagedQueryDto } from '@pem/platform-core';

export class GetListCategoriesQuery extends PlatformPagedQueryDto {
    constructor(data?: Partial<GetListCategoriesQuery>) {
        super(data);
        if (data == null) return;
    }
}
