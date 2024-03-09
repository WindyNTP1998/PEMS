import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlatformComponent } from '@pem/platform-core';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';

@Component({
    standalone: true,
    imports: [RouterModule, HttpClientModule, AppHeaderComponent],
    selector: 'pem-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class AppComponent extends PlatformComponent {
    title = 'ecommerce';

    constructor() {
        super();
    }
}
