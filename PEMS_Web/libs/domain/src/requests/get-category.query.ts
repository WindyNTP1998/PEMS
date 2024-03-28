export class GetCategoryQuery {
    public id!: string;

    constructor(data?: Partial<GetCategoryQuery>) {
        if (data == undefined) return;
        if (data.id != undefined) this.id = data.id;
    }
}
