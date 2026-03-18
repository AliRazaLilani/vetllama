import { Routes } from '@angular/router';

export const pharmacy_routes: Routes = [
    { path: 'pharmacy',
    loadComponent: () => import('./pharmacy.component').then((m) => m.PharmacyComponent),
    children: [
      {
        path: '',
          loadComponent: () => import('./authentication/authentication.component').then((m) => m.AuthenticationComponent),
          children: [
            {
              path: '',
              redirectTo: 'pharmacy-login',
              pathMatch: 'full'
            },
            {
              path: 'pharmacy-login',
              loadComponent: () => import('./authentication/login/login.component').then((m) => m.LoginComponent),
            },
            {
              path: 'pharmacy-forgot-password',
              loadComponent: () => import('./authentication/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
            },
            {
              path: 'pharmacy-register',
              loadComponent: () => import('./authentication/register/register.component').then((m) => m.RegisterComponent),
            }
          ],
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products.component').then((m) => m.ProductsComponent),
        children: [
          {
            path: 'product-list',
            loadComponent: () => import('./products/product-list/product-list.component').then((m) => m.ProductListComponent),
          },
          {
            path: 'add-product',
            loadComponent: () => import('./products/add-product/add-product.component').then((m) => m.AddProductComponent),
          },
          {
            path: 'outstock',
            loadComponent: () => import('./products/outstock/outstock.component').then((m) => m.OutstockComponent),
          },
          {
            path: 'expired',
            loadComponent: () => import('./products/expired/expired.component').then((m) => m.ExpiredComponent),
          },
          {
            path: 'edit-product',
            loadComponent: () => import('./products/edit-product/edit-product.component').then((m) => m.EditProductComponent),
          },
        ],
      },
      {
        path: 'categories',
        loadComponent: () => import('./categories/categories.component').then((m) => m.CategoriesComponent),
      },
      {
        path: 'purchase',
        loadComponent: () => import('./purchase/purchase.component').then((m) => m.PurchaseComponent),
        children: [
          {
            path: 'purchase-list',
            loadComponent: () => import('./purchase/purchase-list/purchase-list.component').then((m) => m.PurchaseListComponent),
          },
          {
            path: 'add-purchase',
            loadComponent: () => import('./purchase/add-purchase/add-purchase.component').then((m) => m.AddPurchaseComponent),
          },
          {
            path: 'order',
            loadComponent: () => import('./purchase/order/order.component').then((m) => m.OrderComponent),
          },
          {
            path: 'edit-purchase',
            loadComponent: () => import('./purchase/edit-purchase/edit-purchase.component').then((m) => m.EditPurchaseComponent),
          },
        ],
      },
      {
        path: 'sales',
        loadComponent: () => import('./sales/sales.component').then((m) => m.SalesComponent),
      },
      {
        path: 'supplier',
        loadComponent: () => import('./supplier/supplier.component').then((m) => m.SupplierComponent),
        children: [
          {
            path: 'supplier-list',
            loadComponent: () => import('./supplier/supplier-list/supplier-list.component').then((m) => m.SupplierListComponent),
          },
          {
            path: 'edit-supplier',
            loadComponent: () => import('./supplier/edit-supplier/edit-supplier.component').then((m) => m.EditSupplierComponent),
          },
          {
            path: 'add-supplier',
            loadComponent: () => import('./supplier/add-supplier/add-supplier.component').then((m) => m.AddSupplierComponent),
          },
        ],
      },
      {
        path: 'transactions-list',
        loadComponent: () => import('./transactions-list/transactions-list.component').then((m) => m.TransactionsListComponent),
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
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then((m) => m.SettingsComponent),
      },

      {
        path: 'customer-orders',
        loadComponent: () => import('./customer-orders/customer-orders.component').then((m) => m.CustomerOrdersComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'invoice',
        loadComponent: () => import('./invoice/invoice.component').then((m) => m.InvoiceComponent),
      },
    ],
  },
];