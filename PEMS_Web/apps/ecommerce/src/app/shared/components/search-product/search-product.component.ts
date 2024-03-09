import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent, PlatformCoreModule } from '@pem/platform-core';
import { FormControl } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'pem-search-product',
    standalone: true,
    imports: [CommonModule, PlatformCoreModule, MatIcon, MatButton],
    templateUrl: './search-product.component.html',
    styleUrl: './search-product.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchProductComponent extends PlatformComponent {
    public searchFormControl = new FormControl('');
}
