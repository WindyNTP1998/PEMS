import { Route } from '@angular/router';
import { AdminDashboardComponent } from './routes/admin-dashboard/admin-dashboard.component';
import { CategoryManagementComponent } from './routes/category-management/category-management.component';

export const appRoutes: Route[] = [

    {
        path: '',
        component: AdminDashboardComponent
    },
    {
        path: 'category-management',
        component: CategoryManagementComponent
    },
    // {
    //     path: 'no-permission-error',
    //     component: NoPermissionErrorComponent
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: '**',
        redirectTo: ''
    }
];
