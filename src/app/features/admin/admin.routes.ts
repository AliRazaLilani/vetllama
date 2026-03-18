import { Routes } from "@angular/router";

export const Admin_Routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: '', loadComponent: () => import('./authentication/authentication.component').then((m) => m.AuthenticationComponent),
        children: [
          {
            path: '',
            redirectTo: 'admin-login',
            pathMatch: 'full'
          },
          {
            path: 'admin-login',
            loadComponent: () => import('./authentication/login/login.component').then((m) => m.LoginComponent),
          },
          {
            path: 'admin-forgot-password',
            loadComponent: () => import('./authentication/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
          },
          {
            path: 'admin-register',
            loadComponent: () => import('./authentication/register/register.component').then((m) => m.RegisterComponent),
          },
          {
            path: 'lock-screen',
            loadComponent: () => import('./authentication/lock-screen/lock-screen.component').then((m) => m.LockScreenComponent),
          },
        ],
      },
      {
        path: 'appointment-list',
        loadComponent: () => import('./appointment-list/appointment-list.component').then((m) => m.AppointmentListComponent),
      },
      {
        path: 'blank-page',
        loadComponent: () => import('./blank-page/blank-page.component').then((m) => m.BlankPageComponent),
      },
      {
        path: 'components',
        loadComponent: () => import('./ui-interface/components/components.component').then((m) => m.ComponentsComponent),
      },

      {
        path: 'doctor-list',
        loadComponent: () => import('./doctor-list/doctor-list.component').then((m) => m.DoctorListComponent),
      },

      {
        path: 'invoice',
        loadComponent: () => import('./invoice/invoice.component').then((m) => m.InvoiceComponent),
      },

      {
        path: 'patient-list',
        loadComponent: () => import('./patient-list/patient-list.component').then((m) => m.PatientListComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then((m) => m.ProfileComponent),
      },

      {
        path: 'reviews',
        loadComponent: () => import('./reviews/reviews.component').then((m) => m.ReviewsComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'specialities',
        loadComponent: () => import('./specialities/specialities.component').then((m) => m.SpecialitiesComponent),
      },

      {
        path: 'transactions-list',
        loadComponent: () => import('./transactions-list/transactions-list.component').then((m) => m.TransactionsListComponent),
      },
      {
        path: 'forms',
        loadComponent: () => import('./ui-interface/forms/forms.component').then((m) => m.FormsComponent),
        children : [
          {
            path: 'form-basic-inputs',  
            loadComponent: () => import('./ui-interface/forms/form-basic-inputs/form-basic-inputs.component').then((m) => m.FormBasicInputsComponent),
          },
          {
            path: 'form-horizontal',
            loadComponent: () => import('./ui-interface/forms/form-horizontal/form-horizontal.component').then((m) => m.FormHorizontalComponent),
          },
          {
            path: 'form-input-groups',
            loadComponent: () => import('./ui-interface/forms/form-input-groups/form-input-groups.component').then((m) => m.FormInputGroupsComponent),
          },
          {
            path: 'form-mask',
            loadComponent: () => import('./ui-interface/forms/form-mask/form-mask.component').then((m) => m.FormMaskComponent),
          },
          {
            path: 'form-validation',
            loadComponent: () => import('./ui-interface/forms/form-validation/form-validation.component').then((m) => m.FormValidationComponent),
          },
          {
            path: 'form-vertical',
            loadComponent: () => import('./ui-interface/forms/form-vertical/form-vertical.component').then((m) => m.FormVerticalComponent),
          },
        ]
      },
      {
        path: 'errors',
        loadComponent: () => import('./errors/errors.component').then((m) => m.ErrorsComponent),
        children: [
          {
            path: 'error404',
            loadComponent: () => import('./errors/error404/error404.component').then((m) => m.Error404Component),
          },
          {
            path: 'error500',
            loadComponent: () => import('./errors/error500/error500.component').then((m) => m.Error500Component),
          },
        ],
      },
      {
        path: 'tables',
        loadComponent: () => import('./ui-interface/tables/tables.component').then((m) => m.TablesComponent),
        children: [
          {
            path: 'data-tables',
            loadComponent: () => import('./ui-interface/tables/data-tables/data-tables.component').then((m) => m.DataTablesComponent),
          },
          {
            path: 'tables-basic',
            loadComponent: () => import('./ui-interface/tables/tables-basic/tables-basic.component').then((m) => m.TablesBasicComponent),
          },
        ],
      },
      {
        path: 'reports',
        loadComponent: () => import('./reports/reports.component').then((m) => m.ReportsComponent),
        children: [
          {
            path: 'invoice-report',
            loadComponent: () => import('./reports/invoice-report/invoice-report.component').then((m) => m.InvoiceReportComponent),
          },
        ],
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      }
    ],
  },
]as const;