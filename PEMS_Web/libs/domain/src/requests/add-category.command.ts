export class AddCategoryCommand {
	public name!: string;
	public slug!: string;
	public categoryImageUrl!: string;
	public parentId!: string;
	
	public constructor(data?: Partial<AddCategoryCommand>) {
		
		if (data == undefined) return;
		if (data.name != undefined) this.name = data.name;
		if (data.slug != undefined) this.slug = data.slug;
		if (data.categoryImageUrl != undefined) this.categoryImageUrl = data.categoryImageUrl;
		if (data.parentId != undefined) this.parentId = data.parentId;
	}
}