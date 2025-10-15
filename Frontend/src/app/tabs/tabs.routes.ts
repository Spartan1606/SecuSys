import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth-guard';
import { RoleGuard } from '../guards/role-guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'tab1', loadComponent: () => import('../tab1/tab1.page').then(m => m.Tab1Page) },
      { path: 'tab2', loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page) },

      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then(m => m.Tab3Page),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['student', 'teacher', 'admin'] },
      },
      {
        path: 'tab4',
        loadComponent: () => import('../tab4/tab4.page').then(m => m.Tab4Page),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['teacher', 'admin'] },
      },
      {
        path: 'tab5',
        loadComponent: () => import('../tab5/tab5.page').then(m => m.Tab5Page),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['teacher', 'admin'] },
      },

      {
        path: 'tab6',
        loadComponent: () => import('../tab6/tab6.page').then(m => m.Tab6Page),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin'] }
      },

      { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
];
