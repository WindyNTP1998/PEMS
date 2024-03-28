import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformComponent} from '@pem/platform-core';
import {PageMenuComponent} from '../../shared/components/page-menu/page-menu.component';
import {Category, CategoryApiService} from '@pem/domain';

@Component({
    selector: 'pem-home-page',
    standalone: true,
    imports: [CommonModule, PageMenuComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent extends PlatformComponent implements OnInit {

    public rootCategories: Category[] = [];
    public loadRootCategories = this.effect(() => {
        return this.categoryApiService.loadRootCategories().pipe(
            this.observerLoadingErrorState('loadRootCategories'),
            this.tapResponse((result) => {
                this.rootCategories = result;
            })
        );
    });

    constructor(private categoryApiService: CategoryApiService) {
        super();
    }

    public override ngOnInit() {
        super.ngOnInit();
    }
}
