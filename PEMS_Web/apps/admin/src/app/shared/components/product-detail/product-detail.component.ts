import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformFormComponent, PlatformFormConfig } from '@pem/platform-core';
import { ProductDetailFormVm } from './product-detail.view-model';
import { forkJoin, map, of } from 'rxjs';
import { Product, ProductApiService } from '@pem/domain';
import { FormControl, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BravoCommonModule } from '@pem/common';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'product-detail',
    standalone: true,
    imports: [CommonModule, TranslateModule, BravoCommonModule, MatDivider],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent extends PlatformFormComponent<ProductDetailFormVm> {
    @Input() public productId: string | undefined = undefined;
    @Input() public product?: Product;

    constructor(private productApiService: ProductApiService) {
        super();
    }

    protected onInitVm = () => {
        return forkJoin([
            this.productId != undefined ? this.productApiService.getProduct(this.productId) : of(this.product)
        ]).pipe(
            this.observerLoadingErrorState('getProduct'),
            map(([product]) => {
                return new ProductDetailFormVm({
                    mode: this.mode,
                    product: product
                });
            })
        );
    };

    protected initialFormConfig = (): PlatformFormConfig<ProductDetailFormVm> => {
        return {
            controls: {
                code: new FormControl(this.vm().code, [Validators.required]),
                name: new FormControl(this.vm().name, [Validators.required]),
                imageUrls: new FormControl(this.vm().imageUrls, [Validators.required]),
                isPublish: new FormControl(this.vm().isPublish, [Validators.required]),
                packageUnit: new FormControl(this.vm().packageUnit, [Validators.required]),
                productForm: new FormControl(this.vm().productForm, [Validators.required]),
                productRanking: new FormControl(this.vm().productRanking, [Validators.required]),
                shortDescription: new FormControl(this.vm().shortDescription, [Validators.required]),
                description: new FormControl(this.vm().description, [Validators.required]),
                slug: new FormControl(this.vm().slug, [Validators.required]),
                fullPathSlug: new FormControl(this.vm().fullPathSlug, [Validators.required]),
                specification: new FormControl(this.vm().specification, [Validators.required]),
                webName: new FormControl(this.vm().webName, [Validators.required]),
                registerNumber: new FormControl(this.vm().registerNumber, [Validators.required]),
                price: new FormControl(this.vm().price, [Validators.required]),
                brandId: new FormControl(this.vm().brandId, [Validators.required])
            },
            afterInit: () => {}
        };
    };

    public onClosePopup() {}
}
