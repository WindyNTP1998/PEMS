import {
    immutableUpdate,
    PlatformPagedResultDto,
    PlatformVm,
    PlatformVmStore,
    tapSkipFirst,
    Watch
} from '@pem/platform-core';
import { IPageInfo } from '../../../../../../libs/common/src/ui-model/table.model';
import { GetProductListQuery, Product, ProductApiService } from '@pem/domain';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

export class ProductManagementState extends PlatformVm {
    public pageInfo: IPageInfo = { pageIndex: 0, pageSize: 0, totalItems: 0, totalPages: 0 };

    @Watch<ProductManagementState>('updatePageInfo')
    public query: GetProductListQuery = new GetProductListQuery({ maxResultCount: 20 });
    @Watch<ProductManagementState>('updatePageInfo')
    public result?: PlatformPagedResultDto<Product>;

    constructor(data?: Partial<ProductManagementState>) {
        super(data);
        if (data == undefined) return;
        if (data.query != undefined) this.query = new GetProductListQuery(data.query);
        if (data.result != undefined) this.result = new PlatformPagedResultDto<Product>(data.result);
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
export class ProductManagementStore extends PlatformVmStore<ProductManagementState> {
    public readonly query$ = this.select((state: ProductManagementState) => state.query);

    public reloadOrInitData = () => {
        this.loadProducts(this.currentState.query, true);
    };

    protected onInitVm = () => {
        this.subscribe(this.query$.pipe(tapSkipFirst(query => this.loadProducts(query))));
    };

    public vmConstructor = (data?: Partial<ProductManagementState>) => new ProductManagementState(data);

    protected cachedStateKeyName = () => 'CategoryManagementVmStore';

    public setPageIndex = (pageIndex: number) => {
        this.updateState({ query: this.currentState.query.withPageIndex(pageIndex) });
    };

    public loadProducts = this.effect((query$: Observable<GetProductListQuery>, isReloading?: boolean) => {
        return query$.pipe(
            switchMap(query => this.productApiService.getProductList(query)),
            this.observerLoadingErrorState('loadingProduct'),
            this.tapResponse(result => {
                this.updateState({ result: result });
            })
        );
    });

    constructor(private productApiService: ProductApiService) {
        super(
            new ProductManagementState({
                query: new GetProductListQuery({
                    skipCount: 0,
                    maxResultCount: 20,
                    withCategories: true,
                    withBrand: true
                })
            })
        );
    }
}
