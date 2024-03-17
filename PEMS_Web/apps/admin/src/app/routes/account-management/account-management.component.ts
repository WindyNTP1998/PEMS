import { CommonModule } from "@angular/common";
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { MaterialModule } from "@pem/common";
import { PlatformComponent } from "@pem/platform-core";

@Component({
    selector: 'account-management',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: './account-management.component.html',
    styleUrl: './account-management.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountManagementComponent extends PlatformComponent {}
