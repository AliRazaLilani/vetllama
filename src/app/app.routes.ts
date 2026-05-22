import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.routes').then((m) => m.Page_Routes),
  },
  {
    path: 'error',
    loadComponent: () => import('./error/error.component').then((m) => m.ErrorComponent),
    children: [
      {
        path: 'error404',
        loadComponent: () =>
          import('.//error/error404/error404.component').then((m) => m.Error404Component),
      },
      {
        path: 'error500',
        loadComponent: () =>
          import('./error/error500/error500.component').then((m) => m.Error500Component),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error/error404',
    pathMatch: 'full',
  },
] as const;
