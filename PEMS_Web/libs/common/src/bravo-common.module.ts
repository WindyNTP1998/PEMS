import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BravoCommonRootModule } from './bravo-common-root.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputMaskModule } from '@ngneat/input-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { BravoDynamicComponentService } from './services/dynamic-component.service';
import { MaterialModule } from './material.module';

@NgModule({
    imports: [
        BravoCommonRootModule,

        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,

        MaterialModule,
        NgSelectModule,
        NgOptimizedImage,
        InputMaskModule,
        NgxPaginationModule,
        FlexLayoutModule
    ],
    exports: [
        BravoCommonRootModule,

        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,

        NgOptimizedImage

    ],
    declarations: [],
    providers: [
        // These services must be new instance per modules
        BravoDynamicComponentService
    ]
})
export class BravoCommonModule {
}
