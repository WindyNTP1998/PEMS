import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformComponent} from "@pem/platform-core";
import {Category, CategoryApiService} from "@pem/domain";

@Component({
    selector: 'category-menu-content',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './category-menu-content.component.html',
    styleUrl: './category-menu-content.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryMenuContentComponent extends PlatformComponent implements OnInit {
    @Input() public category!: Category;

    constructor(private categoryApiService: CategoryApiService) {
        super();
    }

    public override ngOnInit() {
        super.ngOnInit();

    }
}
