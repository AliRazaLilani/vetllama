import { Routes } from '@angular/router';

export const Page_Routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages.component').then((m) => m.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'vet-registration',
        loadComponent: () => import('./vet-registration/vet-registration.component').then((m) => m.VetRegistrationComponent),
      },
    ],
  },
] as const;
