import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserList } from './users/user-list/user-list';
import { UserForm } from './users/user-form/user-form';
import { Unauthorized } from './pages/unauthorized/unauthorized';
import { PublicHome } from './pages/public-home/public-home';
import { About } from './pages/about/about';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: PublicHome },
  { path: 'about', component: About },

  {
    path: '',
    loadChildren: () =>
      import('./auth/auth-routing-module')
        .then(m => m.AuthRoutingModule)
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: Dashboard },

      {
        path: 'users',
        children: [
          {
            path: 'list',
            component: UserList,
            canActivate: [RoleGuard],
            data: { roles: ['Admin', 'User'] }
          },
          {
            path: 'add',
            component: UserForm,
            canActivate: [RoleGuard],
            data: { roles: ['Admin'] }
          },
          {
            path: 'edit/:id',
            component: UserForm,
            canActivate: [RoleGuard],
            data: { roles: ['Admin'] }
          }
        ]
      },

      {
        path: 'products/list',
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'User'] },
        loadComponent: () =>
          import('./pages/products-list/products-list')
            .then(m => m.ProductsList)
      },

      {
        path: 'products/categories',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        loadComponent: () =>
          import('./pages/categories/categories')
            .then(m => m.Categories)
      },

      {
        path: 'reports/monthly',
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Manager'] },
        loadComponent: () =>
          import('./pages/reports-monthly/reports-monthly')
            .then(m => m.ReportsMonthly)
      },

      {
        path: 'reports/yearly',
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Manager'] },
        loadComponent: () =>
          import('./pages/reports-yearly/reports-yearly')
            .then(m => m.ReportsYearly)
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./user-profile/profile-container/profile-container')
            .then(m => m.ProfileContainer)
      },

      {
        path: 'profile/preview',
        loadComponent: () =>
          import('./user-profile/profile-preview-page/profile-preview-page')
            .then(m => m.ProfilePreviewPage)
      }

    ]
  },

  { path: 'unauthorized', component: Unauthorized },

  { path: '**', redirectTo: 'home' }
];
