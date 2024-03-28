export class GetSubCategoriesQuery {
    public id!: string;
    public withSubCategories: boolean = false;

    constructor(data?: Partial<GetSubCategoriesQuery>) {
        if (data == undefined) return;
        if (data.id != undefined) this.id = data.id;
        if (data.withSubCategories != undefined) this.withSubCategories = data.withSubCategories;
    }
}
