import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {list_toDictionary, PlatformComponent, Watch} from "@pem/platform-core";
import {Category, CategoryApiService, GetSubCategoriesQuery, ProductApiService} from "@pem/domain";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {CategoryMenuContentComponent} from "../category-menu-content/category-menu-content.component";

@Component({
    selector: 'category-menu',
    standalone: true,
    imports: [CommonModule, NgbPopover, CategoryMenuContentComponent],
    templateUrl: './category-menu.component.html',
    styleUrl: './category-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryMenuComponent extends PlatformComponent implements OnInit {
    @Input() public rootCategory!: Category;

    @Watch<CategoryMenuComponent>('initSubCategoriesDict')
    public subCategories: Category[] = [];
    public subCategoriesDict: Dictionary<Category> = {};
    public selectedCategoryId?: string;

    //@Input() public subCategories: Category[] = [];

    constructor(private productService: ProductApiService, private categoryApiService: CategoryApiService) {
        super();
    }

    public override ngOnInit() {
        super.ngOnInit();
        if (this.rootCategory?.id != undefined) this.loadChildCategories();
    }

    public initSubCategoriesDict() {
        this.subCategoriesDict = list_toDictionary(this.subCategories, p => p.id!)
    }

    public loadChildCategories = this.effect(() => {
        return this.categoryApiService.loadChildCategories(new GetSubCategoriesQuery({
            id: this.rootCategory.id,
            withSubCategories: true
        })).pipe(
            this.observerLoadingErrorState('loadChildCategories'),
            this.tapResponse((result) => {
                this.subCategories = result;
            })
        );
    });

    public onClickOpenCategoryContent(selectedCategoryId: string) {
        this.selectedCategoryId = selectedCategoryId;
    }
}
