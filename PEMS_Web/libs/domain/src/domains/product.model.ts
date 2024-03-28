import { Brand } from './brand.model';
import { Category } from './category.model';

export enum PackageUnit {
    Blister = 'Blister',
    Sachet = 'Sachet',
    Ampoules = 'Ampoules',
    Bottles = 'Bottles',
    Vials = 'Vials',
    Cartoners = 'Cartoners',
    Containers = 'Containers',
    Counters = 'Counters',
    Syringe = 'Syringe',
    Strip = 'Strip',
    Primary = 'Primary'
}

export enum ProductForm {
    Box = 'Box',
    Tube = 'Tube',
    Bag = 'Bag',
    Piece = 'Piece',
    Ampoules = 'Ampoules',
    Bottle = 'Bottle',
    Can = 'Can',
    Blister = 'Blister',
    FilterBag = 'FilterBag'
}

export enum ProductOrderBy {
    Price = 'Price',
    Name = 'Name',
    Newest = 'Newest'
}

export class Product {
    public id?: string;
    public name: string = '';
    public code: string = '';
    public imageUrls: string[] = [];
    public isPublish: boolean = true;
    public packageUnit: PackageUnit = PackageUnit.Blister;
    public productForm: ProductForm = ProductForm.Box;
    public productRanking: number = 5.0;
    public shortDescription: string = '';
    public description: string = '';
    public slug: string = '';
    public fullPathSlug: string = '';
    public specification: string = '';
    public webName: string = '';
    public registerNumber: string = '';
    public price: number = 0.0;
    public brandId: string = '';

    public createdDate?: Date;
    public lastUpdatedDate?: Date;
    public createdBy?: string;
    public lastUpdatedBy?: string;

    public brand?: Brand;
    public categories?: Category[];

    constructor(data?: Partial<Product>) {
        if (data == undefined) return;
        if (data.id != undefined) this.id = data.id;
        if (data.name != undefined) this.name = data.name;
        if (data.code != undefined) this.code = data.code;
        if (data.imageUrls != undefined) this.imageUrls = data.imageUrls;
        if (data.isPublish != undefined) this.isPublish = data.isPublish;
        if (data.packageUnit != undefined) this.packageUnit = data.packageUnit;
        if (data.productForm != undefined) this.productForm = data.productForm;
        if (data.productRanking != undefined) this.productRanking = data.productRanking;
        if (data.shortDescription != undefined) this.shortDescription = data.shortDescription;
        if (data.description != undefined) this.description = data.description;
        if (data.slug != undefined) this.slug = data.slug;
        if (data.fullPathSlug != undefined) this.fullPathSlug = data.fullPathSlug;
        if (data.specification != undefined) this.specification = data.specification;
        if (data.webName != undefined) this.webName = data.webName;
        if (data.registerNumber != undefined) this.registerNumber = data.registerNumber;
        if (data.price != undefined) this.price = data.price;
        if (data.brandId != undefined) this.brandId = data.brandId;
        if (data.createdDate != undefined) this.createdDate = new Date(data.createdDate);
        if (data.lastUpdatedDate != undefined) this.lastUpdatedDate = new Date(data.lastUpdatedDate);
        if (data.createdBy != undefined) this.createdBy = data.createdBy;
        if (data.lastUpdatedBy != undefined) this.lastUpdatedBy = data.lastUpdatedBy;
        if (data.brand != undefined) this.brand = new Brand(data.brand);
        if (data.categories != undefined) this.categories = data.categories.map(c => new Category(c));
    }

    public get lastCategory(): Category | undefined {
        if (this.categories == undefined || this.categories.length == 0) return undefined;
        return this.categories[this.categories.length - 1];
    }
}
