import { immutableUpdate, PlatformPagedResultDto, PlatformVm, PlatformVmStore, tapSkipFirst, Watch } from '@pem/platform-core';
import { Injectable } from '@angular/core';
import { IPageInfo } from '../../../../../../libs/common/src/ui-model/table.model';
import { GetListCategoriesQuery } from '../../../../../../libs/domain/src/admin/api-services/requests/get-list-categories.query';
import { Category, CategoryApiService } from '@pem/domain';

import { Observable, switchMap } from 'rxjs';

export class CategoryManagementState extends PlatformVm {
    public pageInfo: IPageInfo = { pageIndex: 0, pageSize: 0, totalItems: 0, totalPages: 0 };
    @Watch<CategoryManagementState>('updatePageInfo')
    public query: GetListCategoriesQuery = new GetListCategoriesQuery();
    @Watch<CategoryManagementState>('updatePageInfo')
    public result?: PlatformPagedResultDto<Category>;

    constructor(data?: Partial<CategoryManagementState>) {
        super(data);
        if (data == undefined) return;
        if (data.query != undefined) this.query = new GetListCategoriesQuery(data.query);
        if (data.result != undefined) this.result = new PlatformPagedResultDto<Category>(data.result);
        if (data.pageInfo != undefined) this.pageInfo = data.pageInfo;
    }

    public updatePageInfo(): void {
        this.pageInfo = immutableUpdate(this.pageInfo, {
            pageIndex: this.query?.pageIndex() ?? 0,
            pageSize: this.query?.pageSize() ?? 0,
            totalItems: this.result?.totalCount
        });
    }
}

@Injectable({ providedIn: 'root' })
export class CategoryManagementStoreStore extends PlatformVmStore<CategoryManagementState> {
    public readonly query$ = this.select((state: CategoryManagementState) => state.query);
    public loadCategories = this.effect((query$: Observable<GetListCategoriesQuery>, isReloading?: boolean) => {
        return query$.pipe(
            switchMap((query) => this.categoryApiService.getCategoryList(query)),
            this.observerLoadingErrorState('loadingCategories'),
            this.tapResponse((result) => {
                this.updateState({ result: result });
            })
        );
    });

    constructor(private categoryApiService: CategoryApiService) {
        super(new CategoryManagementState({
                query: new GetListCategoriesQuery({ skipCount: 0, maxResultCount: 20 })
            }
        ));
    }

    public reloadOrInitData = () => {
        this.loadCategories(this.currentState.query, true);
    };

    public vmConstructor = (data?: Partial<CategoryManagementState>) => new CategoryManagementState(data);

    public setPageIndex = (pageIndex: number) => {
        this.updateState({ query: this.currentState.query.withPageIndex(pageIndex) });
    };

    protected onInitVm = () => {
        this.subscribe(this.query$.pipe(tapSkipFirst(query => this.loadCategories(query))));
    };

    protected cachedStateKeyName = () => 'CategoryManagementVmStore';
}
