import { MatDialogConfig } from '@angular/material/dialog';

import { Observable } from 'rxjs';

export interface BravoDialogConfigs extends MatDialogConfig {
    padding?: string;
    closeOn$?: Observable<undefined | boolean>;
}
