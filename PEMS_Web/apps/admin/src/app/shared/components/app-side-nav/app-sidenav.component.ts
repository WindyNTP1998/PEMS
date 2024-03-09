import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from '@pem/platform-core';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [CommonModule, MatDivider, RouterLink],
    templateUrl: './app-sidenav.component.html',
    styleUrl: './app-sidenav.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidenavComponent extends PlatformComponent {

}
