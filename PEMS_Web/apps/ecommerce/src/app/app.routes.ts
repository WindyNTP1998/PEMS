import { Route } from '@angular/router';
import { HomePageComponent } from './route/home-page/home-page.component';
import { ProductDetailComponent } from './route/product-detail/product-detail.component';

export const ecommerceRoutes: Route[] = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'product',
        component: ProductDetailComponent
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
