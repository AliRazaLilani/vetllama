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
      {
        path: 'doctors',
        loadComponent: () =>
          import('./doctors/doctors.component').then(
            (m) => m.DoctorsComponent,
          ),
        children: [
          {
            path: 'map-grid',
            loadComponent: () =>
              import('./doctors/map-grid/map-grid.component').then(
                (m) => m.MapGridComponent,
              ),
          },
        ],
      },
    ],
  },
] as const;
