export class GetProductQuery {
    public id!: string;
    public withBrand: boolean = false;
    public withCategories: boolean = false;

    constructor(data?: Partial<GetProductQuery>) {
        if (data == undefined) return;
        if (data.id != undefined) this.id = data.id;
        if (data.withBrand != undefined) this.withBrand = data.withBrand;
        if (data.withCategories != undefined) this.withCategories = data.withCategories;
    }
}
