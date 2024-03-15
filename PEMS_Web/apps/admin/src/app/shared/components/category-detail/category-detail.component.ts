import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformDomainModule, PlatformFormComponent, PlatformFormConfig } from '@pem/platform-core';
import { CategoryDetailFormVm } from './categogy-detail.view-model';
import { forkJoin, map, of } from 'rxjs';
import { AddCategoryCommand, Category, CategoryApiService, GetListCategoriesQuery } from '@pem/domain';
import { FormControl, Validators } from '@angular/forms';
import { BravoCommonModule } from '@pem/common';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'category-detail',
    standalone: true,
    imports: [
        CommonModule,
        PlatformDomainModule,
        BravoCommonModule,
        MatLabel,
        MatFormField,
        MatInput,
        MatPrefix,
        MatSuffix,
        MatIconButton,
        MatSelect,
        MatOption,
        MatButton
    ],
    templateUrl: './category-detail.component.html',
    styleUrl: './category-detail.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDetailComponent extends PlatformFormComponent<CategoryDetailFormVm> {
    @Input() public categoryId: string | undefined = undefined;
    @Input() public category?: Category;

    constructor(
        private categoryApiService: CategoryApiService,
        private dialogRef: MatDialogRef<CategoryDetailComponent>
    ) {
        super();
    }

    public onsubmit() {
        this.form.disable();

        this.categoryApiService
            .addCategory(new AddCategoryCommand(this.vm().formData))
            .pipe(
                this.observerLoadingErrorState('addCategory'),
                this.tapResponse(
                    () => {
                        this.toast.success('Add new category successfully!');
                        this.dialogRef.close(true);
                    },
                    () => {
                        this.toast.error('Add new category failed!');
                    },
                    () => {
                        this.form.enable();
                    }
                )
            )
            .subscribe();
    }

    public onSave() {
        this.form.disable();

        this.categoryApiService
            .updateCategory({
                updatedCategory: this.vm().mapToCategoryModel()!
            })
            .pipe(
                this.observerLoadingErrorState('addCategory'),
                this.tapResponse(
                    () => {
                        this.toast.success('Save new category successfully!');
                        this.dialogRef.close(true);
                    },
                    () => {
                        this.toast.error('Save new category failed!');
                    },
                    () => {
                        this.form.enable();
                    }
                )
            )
            .subscribe();
    }

    public onClosePopup() {
        this.dialogRef.close();
    }

    protected onInitVm = () => {
        return forkJoin([
            this.categoryId != undefined ? this.categoryApiService.getCategory(this.categoryId) : of(this.category),
            this.categoryApiService.getCategoryList(new GetListCategoriesQuery())
        ]).pipe(
            this.observerLoadingErrorState('loadingCategory'),
            map(([category, categories]) => {
                return new CategoryDetailFormVm({
                    mode: this.mode,
                    category: category,
                    categoryOptions: categories.items
                });
            })
        );
    };

    protected initialFormConfig = (): PlatformFormConfig<CategoryDetailFormVm> => {
        return {
            controls: {
                name: new FormControl(this.vm().name, [Validators.required]),
                slug: new FormControl(this.vm().slug, [Validators.required]),
                categoryImageUrl: new FormControl(this.vm().categoryImageUrl, [Validators.required]),
                parentId: new FormControl(this.vm().parentId, [Validators.required])
            },
            afterInit: () => {}
        };
    };
}
