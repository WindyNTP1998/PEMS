import {Injectable} from '@angular/core';
import {PlatformApiService, PlatformPagedResultDto} from '@pem/platform-core';
import {GetProductListQuery, Product} from '@pem/domain';
import {map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService extends PlatformApiService {
    //public baseUrl = inject(BASE_URL);
    public baseUrl = "http://localhost:5160";

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
