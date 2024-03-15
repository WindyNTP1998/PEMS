import { Route } from '@angular/router';
import { AdminDashboardComponent } from './routes/admin-dashboard/admin-dashboard.component';
import { CategoryManagementComponent } from './routes/category-management/category-management.component';
import { ProductManagementComponent } from './routes/product-management/product-management.component';

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
	// 	path: 'product-management',
	// 	loadChildren: () => import('./routes/product-management/product-management.module').then(m => m.ProductManagementModule)
	// },
	{
		path: 'product-management',
		component: ProductManagementComponent
	},
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
