import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  { path: '',   
    loadChildren: () =>
      import('./features/pages/pages.routes').then(m => m.Page_Routes),
  },
  {
    path: '',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.Admin_Routes),},
   {
        path: 'error',
        loadComponent: () => import('./features/error/error.component').then((m) => m.ErrorComponent),
        children: [
          {
            path: 'error404',
            loadComponent: () => import('./features/error/error404/error404.component').then((m) => m.Error404Component),
          },
          {
            path: 'error500',
            loadComponent: () => import('./features/error/error500/error500.component').then((m) => m.Error500Component),
          },
        ],
      },
  {
    path: '',
    loadChildren: () => import('./features/authentication/authentication.routes').then((m) => m.AUTH_routes),
  },
  { path: '',
    loadChildren: () => import('./features/pharmacy/pharmacy.routes').then((m) => m.pharmacy_routes),
  
  },
  {
    path: '**',
    redirectTo: 'error/error404',
    pathMatch: 'full',
  }


      
]as const;
