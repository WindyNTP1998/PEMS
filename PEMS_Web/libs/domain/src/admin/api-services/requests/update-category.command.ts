import { Category } from '@pem/domain';

export class UpdateCategoryCommand {
	public updatedCategory!: Category;
	
	constructor(data?: Partial<UpdateCategoryCommand>) {
		if (data == undefined) return;
		if (data.updatedCategory != undefined) this.updatedCategory = new Category(data.updatedCategory);
	}
}