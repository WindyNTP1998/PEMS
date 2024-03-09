export class Category {
	id?: string;
	name!: string;
	slug!: string;
	isActive!: boolean;
	level!: number;
	categoryImageUrl!: string;
	parentId ?: string;
	
	//Navigation Properties
	createdDate?: Date;
	lastUpdatedDate?: Date;
	createdBy?: string;
	lastUpdatedBy?: string;
	childCategories?: Category[];
	parentCategories?: Category;
	
	constructor(data?: Partial<Category>) {
		if (data == undefined) return;
		if (data.id != undefined) this.id = data.id;
		if (data.name != undefined) this.name = data.name;
		if (data.slug != undefined) this.slug = data.slug;
		if (data.isActive != undefined) this.isActive = data.isActive;
		if (data.level != undefined) this.level = data.level;
		if (data.categoryImageUrl != undefined) this.categoryImageUrl = data.categoryImageUrl;
		if (data.createdDate != undefined) this.createdDate = data.createdDate;
		if (data.lastUpdatedDate != undefined) this.lastUpdatedDate = data.lastUpdatedDate;
		if (data.createdBy != undefined) this.createdBy = data.createdBy;
		if (data.lastUpdatedBy != undefined) this.lastUpdatedBy = data.lastUpdatedBy;
		if (data.parentId != undefined) this.parentId = data.parentId;
		if (data.childCategories != undefined) this.childCategories = data.childCategories.map(p => new Category(p));
		if (data.parentCategories != undefined) this.parentCategories = new Category(data.parentCategories);
	}
}
