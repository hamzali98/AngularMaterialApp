import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { MaterialButtons } from './material-buttons/material-buttons';
import { UserViewTabs } from './user/user-components/user-view-tabs/user-view-tabs';
import { UserProfile } from './user/user-components/user-profile/user-profile';
import { Login } from './authentication/login/login';
import { authGuard } from './authentication/guards/auth-guard';


export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: UserViewTabs,
        // canActivate: [authGuard],
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
