import { Category } from '@pem/domain';
import { cloneDeep, immutableUpdate, isDifferent, PlatformFormMode, PlatformVm } from '@pem/platform-core';

export class CategoryDetailFormVm extends PlatformVm {
	public mode: PlatformFormMode = 'create';
	public category: Category | undefined = undefined;
	public categoryOptions: Category[] = [];
	
	constructor(data?: Partial<CategoryDetailFormVm>) {
		super(data);
		if (data == undefined) return;
		
		if (data.formData != undefined) this.formData = data.formData;
		if (data.category != undefined) {
			this.category = data.category;
			this._formData = cloneDeep(data.category);
		}
		if (data.mode != undefined) this.mode = data.mode;
		if (data.categoryOptions != undefined) this.categoryOptions = data.categoryOptions;
		
	}
	
	private _formData: Partial<Category> | Category = {};
	public get formData(): Partial<Category> | Category {
		return this._formData;
	}
	
	public set formData(v: Partial<Category>) {
		if (!isDifferent(this._formData, v)) return;
		this._formData = v;
	}
	
	public get name(): string | undefined {
		return this.formData.name;
	}
	
	public set name(v: string) {
		this._formData = immutableUpdate(this.formData, { name: v });
	}
	
	public get slug(): string | undefined {
		return this.formData.slug;
	}
	
	public set slug(v: string) {
		this._formData = immutableUpdate(this.formData, { slug: v });
	}
	
	public get categoryImageUrl(): string | undefined {
		return this.formData.categoryImageUrl;
	}
	
	public set categoryImageUrl(v: string) {
		this._formData = immutableUpdate(this.formData, { categoryImageUrl: v });
	}
	
	public get parentId(): string | undefined {
		return this.formData.parentId;
	}
	
	public set parentId(v: string) {
		this._formData = immutableUpdate(this.formData, { parentId: v });
	}
	
	// public get isActive(): boolean | undefined {
	// 	return this.formData.isActive;
	// }
	//
	// public set isActive(v: boolean) {
	// 	this._formData = immutableUpdate(this.formData, { isActive: v });
	// }
	//
	// public get level(): number | undefined {
	// 	return this.formData.level;
	// }
	//
	// public set level(v: number) {
	// 	this._formData = immutableUpdate(this.formData, { level: v });
	// }
	
	public get fullSlug(): string | undefined {
		const parentCategory = this.categoryOptions.find(c => c.id === this.parentId);
		const slug = this.formData.slug;
		if (parentCategory != undefined && slug != undefined && slug.length > 0) {
			return `${parentCategory.slug}/${this.formData.slug}`;
		}
		return this.slug;
	}
	
	public mapToCategoryModel() {
		if (this.category == undefined) return;
		this.category = immutableUpdate(this.category, {
			name: this.formData.name,
			slug: this.formData.slug,
			parentId: this.formData.parentId,
			categoryImageUrl: this.formData.categoryImageUrl
		});
		
		return this.category;
	}
	
}
