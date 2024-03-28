import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformComponent} from '@pem/platform-core';
import {Category, CategoryApiService} from '@pem/domain';
import {CategoryMenuComponent} from "./category-menu/category-menu.component";

@Component({
    selector: 'page-menu',
    standalone: true,
    imports: [CommonModule, CategoryMenuComponent],
    templateUrl: './page-menu.component.html',
    styleUrl: './page-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageMenuComponent extends PlatformComponent implements OnInit {

    public rootCategories: Category[] = [];

    constructor(private categoryApiService: CategoryApiService) {
        super();
    }

    public override ngOnInit() {
        super.ngOnInit();

        //if (this.rootCategory.id != undefined) this.loadChildCategories()
        this.loadRootCategories();
    }

    public loadRootCategories = this.effect(() => {
        return this.categoryApiService.loadRootCategories().pipe(
            this.observerLoadingErrorState('loadRootCategories'),
            this.tapResponse((result) => {
                this.rootCategories = result;
            })
        );
    });


}
