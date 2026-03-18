import { Routes } from "@angular/router";

export const AUTH_routes: Routes = [
   {
    path: 'authentication',
    loadComponent: () => import('./authentication.component').then((m) => m.AuthenticationComponent),
    children: [
      {
        path: 'login-email',
        loadComponent: () => import('./login-email/login-email.component').then((m) => m.LoginEmailComponent),
      },    
      { 
        path: 'login-phone',
        loadComponent: () => import('./login-phone/login-phone.component').then((m) => m.LoginPhoneComponent),
      },
      {
        path: 'doctor-signup',
        loadComponent: () => import('./doctor-signup/doctor-signup.component').then((m) => m.DoctorSignupComponent),
      },
      {
        path: 'patient-signup',
        loadComponent: () => import('./patient-signup/patient-signup.component').then((m) => m.PatientSignupComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
      },
      {
        path: 'forgot-password2',
        loadComponent: () => import('./forgot-password2/forgot-password2.component').then((m) => m.ForgotPassword2Component),
      },
      {
        path: 'login-email-otp',
        loadComponent: () => import('./login-email-otp/login-email-otp.component').then((m) => m.LoginEmailOtpComponent),
      },
      {
        path: 'login-phone-otp',
          loadComponent: () => import('./login-phone-otp/login-phone-otp.component').then((m) => m.LoginPhoneOtpComponent),
      },
      {
        path: 'signup-success',
        loadComponent: () => import('./signup-success/signup-success.component').then((m) => m.SignupSuccessComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'mobile-otp',
        loadComponent: () => import('./mobile-otp/mobile-otp.component').then((m) => m.MobileOtpComponent),
      },
      {
        path: 'email-otp',
        loadComponent: () => import('./email-otp/email-otp.component').then((m) => m.EmailOtpComponent),
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
]