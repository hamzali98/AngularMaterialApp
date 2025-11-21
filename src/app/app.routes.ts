import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { MaterialButtons } from './material-buttons/material-buttons';
import { Tabs } from './shared/tabs/tabs';
import { UserProfile } from './user/user-components/user-profile/user-profile';
import { Login } from './authentication/login/login';
import { authGuard } from './authentication/guards/auth-guard';
import { roleGuardGuard } from './authentication/guards/role-guard-guard';
import { ProductView } from './products/product-components/product-view/product-view';
import { Dashboard } from './pages/dashboard/dashboard';


export const routes: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: Dashboard,
    },
    {
        path: 'tables',
        title: 'Tables',
        component: Tabs,
        // canActivate: [authGuard],
        canActivate: [roleGuardGuard]
    },
    // {
    //     path: 'login',
    //     title: 'Login',
    //     component: Login
    // },
    {
        path: 'profile',
        title: 'User Profile',
        component: UserProfile,
        // canActivate: [authGuard]
    },
    {
        path: 'matbutons',
        title: 'Material Buttons',
        component: MaterialButtons
    },
    {
        path: '**',
        title: 'Not Found',
        component: NotFound
    }
];
