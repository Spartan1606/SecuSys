import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab6',
    loadComponent: () => import('./tab6/tab6.page').then( m => m.Tab6Page)
  },
];
