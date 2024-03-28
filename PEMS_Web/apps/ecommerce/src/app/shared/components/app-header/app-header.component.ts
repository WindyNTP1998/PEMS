import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchProductComponent} from '../search-product/search-product.component';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';
import {PlatformComponent} from '@pem/platform-core';
import {DialogService} from '@pem/common';
import {RegisterComponent} from '../register/register.component';
import {AuthService} from '../../../auth/auth.service';
import {LoginComponent} from '../login/login.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, SearchProductComponent, MatButtonToggle, MatButton, TranslateModule],
    templateUrl: './app-header.component.html',
    styleUrl: './app-header.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends PlatformComponent {
    constructor(private dialogService: DialogService, public authService: AuthService) {
        super();
    }

    public get userName() {
        return this.authService.loggedUser?.fullName;
    }

    public onClickLogin() {
        this.dialogService.openDialog(LoginComponent, {}, {
            autoFocus: false,
            disableClose: true,
            closeOn$: this.destroyed$
        }).subscribe(({action}) => {
            if (action === 'register') {
                this.onClickRegister();
            } else if (action === 'forgotPassword') {
                console.log('Forgot password clicked');
            }
        });
    }

    public onClickRegister() {
        this.dialogService.openDialog(RegisterComponent, {}, {
            autoFocus: false,
            disableClose: true,
            closeOn$: this.destroyed$
        }).subscribe(({action}) => {
        });
    }

}
