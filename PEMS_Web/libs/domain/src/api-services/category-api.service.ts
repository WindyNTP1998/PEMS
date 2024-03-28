import {Injectable} from '@angular/core';
import {IPlatformPagedResultDto, PlatformApiService, PlatformPagedResultDto} from '@pem/platform-core';

import {map, Observable} from 'rxjs';
import {
    AddCategoryCommand,
    Category,
    GetListCategoriesQuery,
    GetSubCategoriesQuery,
    UpdateCategoryCommand
} from '../index';

@Injectable({
    providedIn: 'root'
})
export class CategoryApiService extends PlatformApiService {
    //public baseUrl = "inject(BASE_URL)";
    public baseUrl = "http://localhost:5160";

    protected get apiUrl(): string {
        return this.baseUrl + '/api/Category';
    }

    public getCategoryList(params: GetListCategoriesQuery): Observable<PlatformPagedResultDto<Category>> {
        return this.get<IPlatformPagedResultDto<Category>>('', params).pipe(
            map(
                (result: IPlatformPagedResultDto<Category>) =>
                    new PlatformPagedResultDto(result, item => new Category(item))
            )
        );
    }

    public getCategory(id: string): Observable<Category> {
        return this.get<Category>(`/${id}`, {}).pipe(
            map((result: Category) => new Category(result))
        );
    }

    public addCategory(params: AddCategoryCommand): Observable<Category> {
        return this.post<Category>('', params).pipe(map((result: Category) => new Category(result)));
    }

    public deleteCategory(id: string): Observable<void> {
        return this.post('/delete', {id: id});
    }

    public updateCategory(params: UpdateCategoryCommand): Observable<void> {
        return this.post('/update', params);
    }

    public loadRootCategories() {
        return this.get<Category[]>('/roots', {}).pipe(
            map((result: Category[]) => result.map(item => new Category(item)))
        );
    }

    public loadChildCategories(params: GetSubCategoriesQuery) {
        return this.get<Category[]>(`/childs`, params).pipe(
            map((result: Category[]) => result.map(item => new Category(item)))
        );
    }

}
