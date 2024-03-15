import { cloneDeep, immutableUpdate, PlatformFormMode, PlatformVm } from '@pem/platform-core';
import { PackageUnit, Product, ProductForm } from '@pem/domain';

export class ProductDetailFormVm extends PlatformVm {
    public mode: PlatformFormMode = 'create';
    public product: Product | undefined = undefined;

    constructor(data?: Partial<ProductDetailFormVm>) {
        super(data);
        if (data == undefined) return;
        if (data.formData != undefined) this.formData = data.formData;
        if (data.product != undefined) {
            this.product = data.product;
            this._formData = cloneDeep(data.product);
        }
        if (data.mode != undefined) this.mode = data.mode;
    }

    private _formData: Partial<Product> | Product = {};
    public get formData(): Partial<Product> | Product {
        return this._formData;
    }

    public set formData(v: Partial<Product>) {
        this._formData = v;
    }

    public get code(): string | undefined {
        return this.formData.code;
    }

    public set code(v: string) {
        this._formData = immutableUpdate(this.formData, { code: v });
    }

    public get name(): string | undefined {
        return this.formData.name;
    }

    public set name(v: string) {
        this._formData = immutableUpdate(this.formData, { name: v });
    }

    public get imageUrls(): string[] {
        return this.formData.imageUrls || [];
    }

    public set imageUrls(v: string[]) {
        this._formData = { ...this.formData, imageUrls: v };
    }

    public get isPublish(): boolean | undefined {
        return this.formData.isPublish;
    }

    public set isPublish(v: boolean) {
        this._formData = immutableUpdate(this.formData, { isPublish: v });
    }

    public get packageUnit(): PackageUnit | undefined {
        return this.formData.packageUnit;
    }

    public get productForm(): ProductForm | undefined {
        return this.formData.productForm;
    }

    public set productForm(v: ProductForm) {
        this._formData = immutableUpdate(this.formData, { productForm: v });
    }

    public get productRanking(): number | undefined {
        return this.formData.productRanking;
    }

    public set productRanking(v: number) {
        this._formData = immutableUpdate(this.formData, { productRanking: v });
    }

    public get shortDescription(): string | undefined {
        return this.formData.shortDescription;
    }

    public set shortDescription(v: string) {
        this._formData = immutableUpdate(this.formData, { shortDescription: v });
    }

    public get description(): string | undefined {
        return this.formData.description;
    }

    public set description(v: string) {
        this._formData = immutableUpdate(this.formData, { description: v });
    }

    public get slug(): string | undefined {
        return this.formData.slug;
    }

    public set slug(v: string) {
        this._formData = immutableUpdate(this.formData, { slug: v });
    }

    public get fullPathSlug(): string | undefined {
        return this.formData.fullPathSlug;
    }

    public set fullPathSlug(v: string) {
        this._formData = immutableUpdate(this.formData, { fullPathSlug: v });
    }

    public get specification(): string | undefined {
        return this.formData.specification;
    }

    public set specification(v: string) {
        this._formData = immutableUpdate(this.formData, { specification: v });
    }

    public get webName(): string | undefined {
        return this.formData.webName;
    }

    public set webName(v: string) {
        this._formData = immutableUpdate(this.formData, { webName: v });
    }

    public get registerNumber(): string | undefined {
        return this.formData.registerNumber;
    }

    public set registerNumber(v: string) {
        this._formData = immutableUpdate(this.formData, { registerNumber: v });
    }

    public get price(): number | undefined {
        return this.formData.price;
    }

    public set price(v: number) {
        this._formData = immutableUpdate(this.formData, { price: v });
    }

    public get brandId(): string | undefined {
        return this.formData.brandId;
    }

    public set brandId(v: string) {
        this._formData = immutableUpdate(this.formData, { brandId: v });
    }
}
