import { Product } from './product.model';

export class Brand {
	public id?: string;
	public name: string = '';
	public from: string = '';
	public manufacturer: string = '';
	public countryOfManufacturer: string = '';
	public createdDate?: Date;
	public lastUpdatedDate?: Date;
	public createdBy?: string;
	public lastUpdatedBy?: string;
	
	products?: Product[];
	
	constructor(data?: Partial<Brand>) {
		if (data == undefined) return;
		if (data.id != undefined) this.id = data.id;
		if (data.name != undefined) this.name = data.name;
		if (data.from != undefined) this.from = data.from;
		if (data.manufacturer != undefined) this.manufacturer = data.manufacturer;
		if (data.countryOfManufacturer != undefined) this.countryOfManufacturer = data.countryOfManufacturer;
		if (data.createdDate != undefined) this.createdDate = new Date(data.createdDate);
		if (data.lastUpdatedDate != undefined) this.lastUpdatedDate = new Date(data.lastUpdatedDate);
		if (data.createdBy != undefined) this.createdBy = data.createdBy;
		if (data.lastUpdatedBy != undefined) this.lastUpdatedBy = data.lastUpdatedBy;
		if (data.products != undefined) this.products = data.products.map(p => new Product(p));
	}
}
