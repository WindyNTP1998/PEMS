import { inject, Injectable } from '@angular/core';
import { IPlatformPagedResultDto, PlatformApiService, PlatformPagedResultDto } from '@pem/platform-core';

import { map, Observable } from 'rxjs';
import { AddCategoryCommand, Category, GetListCategoriesQuery, UpdateCategoryCommand } from '@pem/domain';
import { BASE_URL } from '../../../../../apps/admin/src/app/app.config';

@Injectable({
	providedIn: 'root'
})
export class CategoryApiService extends PlatformApiService {
	public baseUrl = inject(BASE_URL);
	
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
		return this.post('/delete', { id: id });
	}
	
	public updateCategory(params: UpdateCategoryCommand): Observable<void> {
		return this.post('/update', params);
	}
	
}
