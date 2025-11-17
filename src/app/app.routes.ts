import { Routes } from '@angular/router';
// import { UsertableComponent } from './user/user-table/user-table.component';
import { NotFound } from './not-found/not-found';
import { MaterialButtons } from './material-buttons/material-buttons';
import { UserViewTabs } from './user/user-components/user-view-tabs/user-view-tabs';
import { UserProfile } from './user/user-components/user-profile/user-profile';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: UserViewTabs
    },
    {
        path: 'profile',
        title: 'User Profile',
        component: UserProfile
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
