import { inject, Injectable } from '@angular/core';
import { PlatformApiService, PlatformPagedResultDto } from '@pem/platform-core';
import { BASE_URL } from '../../../../../apps/admin/src/app/app.config';
import { GetProductListQuery, Product } from '@pem/domain';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService extends PlatformApiService {
    public baseUrl = inject(BASE_URL);

    protected get apiUrl(): string {
        return this.baseUrl + '/api/Product';
    }

    public getProductList(params: GetProductListQuery): Observable<PlatformPagedResultDto<Product>> {
        return this.get<PlatformPagedResultDto<Product>>('/list', params).pipe(
            map(
                (result: PlatformPagedResultDto<Product>) =>
                    new PlatformPagedResultDto(result, item => new Product(item))
            )
        );
    }

    public getProduct(id: string): Observable<Product> {
        return this.get<Product>('', {}).pipe(map((result: Product) => new Product(result)));
    }
}
