import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AppSidenavComponent } from './shared/components/app-side-nav/app-sidenav.component';
import { PlatformComponent } from '@pem/platform-core';
import { CategoryManagementComponent } from './routes/category-management/category-management.component';

@Component({
    standalone: true,
    imports: [
        MatSidenavContainer,
        MatToolbar,
        MatIcon,
        MatIconButton,
        MatSidenav,
        RouterOutlet,
        MatSidenavModule,
        AppSidenavComponent,
        CategoryManagementComponent
    ],
    selector: 'pem-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends PlatformComponent {
    title = 'admin';
    @ViewChild('sidenav') public sidenav!: MatSidenav;
    isExpanded = false;
    showSubmenu: boolean = false;
    isShowing = false;
    showSubSubMenu: boolean = false;

    mouseenter() {
        if (!this.isExpanded) {
            this.isShowing = true;
        }
    }

    mouseleave() {
        if (!this.isExpanded) {
            this.isShowing = false;
        }
    }
}
