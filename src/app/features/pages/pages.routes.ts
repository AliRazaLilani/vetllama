import { Routes } from '@angular/router';

export const Page_Routes: Routes = [
  //Features Routes//
  {
    path: '',
    loadComponent: () =>
      import('./pages.component').then((m) => m.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home-pages/home-6/home-6.component').then(
            (m) => m.Home6Component,
          ),
        // children: [
        //   {
        //     path: 'index',
        //     loadComponent: () =>
        //       import('./home-pages/home-6/home-6.component').then(
        //         (m) => m.Home6Component,
        //       ),
        //   },
        //   {
        //     path: 'index-2',
        //     loadComponent: () =>
        //       import('./home-pages/home-2/home-2.component').then(
        //         (m) => m.Home2Component,
        //       ),
        //   },

        //   {
        //     path: 'index-3',
        //     loadComponent: () =>
        //       import('./home-pages/home-3/home-3.component').then(
        //         (m) => m.Home3Component,
        //       ),
        //   },
        //   {
        //     path: 'index-4',
        //     loadComponent: () =>
        //       import('./home-pages/home-4/home-4.component').then(
        //         (m) => m.Home4Component,
        //       ),
        //   },
        //   {
        //     path: 'index-5',
        //     loadComponent: () =>
        //       import('./home-pages/home-5/home-5.component').then(
        //         (m) => m.Home5Component,
        //       ),
        //   },
        //   {
        //     path: 'index-6',
        //     loadComponent: () =>
        //       import('./home-pages/home-6/home-6.component').then(
        //         (m) => m.Home6Component,
        //       ),
        //   },
        //   {
        //     path: 'index-7',
        //     loadComponent: () =>
        //       import('./home-pages/home-7/home-7.component').then(
        //         (m) => m.Home7Component,
        //       ),
        //   },
        //   {
        //     path: 'index-8',
        //     loadComponent: () =>
        //       import('./home-pages/home-8/home-8.component').then(
        //         (m) => m.Home8Component,
        //       ),
        //   },
        //   {
        //     path: 'index-9',
        //     loadComponent: () =>
        //       import('./home-pages/home-9/home-9.component').then(
        //         (m) => m.Home9Component,
        //       ),
        //   },
        //   {
        //     path: 'index-10',
        //     loadComponent: () =>
        //       import('./home-pages/home-10/home-10.component').then(
        //         (m) => m.Home10Component,
        //       ),
        //   },
        //   {
        //     path: 'index-11',
        //     loadComponent: () =>
        //       import('./home-pages/home-11/home-11.component').then(
        //         (m) => m.Home11Component,
        //       ),
        //   },
        //   {
        //     path: 'index-12',
        //     loadComponent: () =>
        //       import('./home-pages/home-12/home-12.component').then(
        //         (m) => m.Home12Component,
        //       ),
        //   },
        //   {
        //     path: 'index-13',
        //     loadComponent: () =>
        //       import('./home-pages/home-13/home-13.component').then(
        //         (m) => m.Home13Component,
        //       ),
        //   },
        // ],
      },
      {
        path: 'doctors',
        loadComponent: () =>
          import('./doctors/doctors.component').then((m) => m.DoctorsComponent),
        children: [
          {
            path: 'accounts',
            loadComponent: () =>
              import('./doctors/accounts/accounts.component').then(
                (m) => m.AccountsComponent,
              ),
          },
          {
            path: 'add-billing',
            loadComponent: () =>
              import('./doctors/add-billing/add-billing.component').then(
                (m) => m.AddBillingComponent,
              ),
          },
          {
            path: 'appointments',
            loadComponent: () =>
              import('./doctors/appointments/appointments.component').then(
                (m) => m.AppointmentsComponent,
              ),
            children: [
              {
                path: 'appointment-list',
                loadComponent: () =>
                  import('./doctors/appointments/appointment-list/appointment-list.component').then(
                    (m) => m.AppointmentListComponent,
                  ),
              },
              {
                path: 'doctor-cancelled-appointment',
                loadComponent: () =>
                  import('./doctors/appointments/doctor-cancelled-appointment/doctor-cancelled-appointment.component').then(
                    (m) => m.DoctorCancelledAppointmentComponent,
                  ),
              },
              {
                path: 'doctor-cancelled-appointment2',
                loadComponent: () =>
                  import('./doctors/appointments/doctor-cancelled-appointment2/doctor-cancelled-appointment2.component').then(
                    (m) => m.DoctorCancelledAppointment2Component,
                  ),
              },
              {
                path: 'doctor-completed-appointment',
                loadComponent: () =>
                  import('./doctors/appointments/doctor-completed-appointment/doctor-completed-appointment.component').then(
                    (m) => m.DoctorCompletedAppointmentComponent,
                  ),
              },
              {
                path: 'doctor-appointments-grid',
                loadComponent: () =>
                  import('./doctors/appointments/doctor-appointments-grid/doctor-appointments-grid.component').then(
                    (m) => m.DoctorAppointmentsGridComponent,
                  ),
              },
              {
                path: 'doctor-appointment-start',
                loadComponent: () =>
                  import('./doctors/appointments/doctor-appointment-start/doctor-appointment-start.component').then(
                    (m) => m.DoctorAppointmentStartComponent,
                  ),
              },
              {
                path: 'doctor-upcoming-appointment-details',
                loadComponent: () =>
                  import('./doctors/appointments/doctor-upcoming-appointment-details/doctor-upcoming-appointment-details.component').then(
                    (m) => m.DoctorUpcomingAppointmentDetailsComponent,
                  ),
              },
              {
                path: 'doctor-appointment-details',
                loadComponent: () =>
                  import('./doctors/appointments/doctor-appointment-details/doctor-appointment-details.component').then(
                    (m) => m.DoctorAppointmentDetailsComponent,
                  ),
              },
            ],
          },
          {
            path: 'available-timings',
            loadComponent: () =>
              import('./doctors/available-timings/available-timings.component').then(
                (m) => m.AvailableTimingsComponent,
              ),
          },
          {
            path: 'add-prescription',
            loadComponent: () =>
              import('./doctors/add-prescription/add-prescription.component').then(
                (m) => m.AddPrescriptionComponent,
              ),
          },
          {
            path: 'edit-prescription',
            loadComponent: () =>
              import('./doctors/edit-prescription/edit-prescription.component').then(
                (m) => m.EditPrescriptionComponent,
              ),
          },
          {
            path: 'doctor-dashboard',
            loadComponent: () =>
              import('./doctors/doctor-dashboard/doctor-dashboard.component').then(
                (m) => m.DoctorDashboardComponent,
              ),
          },
          {
            path: 'my-patients',
            loadComponent: () =>
              import('./doctors/my-patients/my-patients.component').then(
                (m) => m.MyPatientsComponent,
              ),
          },
          {
            path: 'patient-profile',
            loadComponent: () =>
              import('./doctors/patient-profile/patient-profile.component').then(
                (m) => m.PatientProfileComponent,
              ),
          },
          {
            path: 'chat-doctor',
            loadComponent: () =>
              import('./doctors/chat-doctor/chat-doctor.component').then(
                (m) => m.ChatDoctorComponent,
              ),
          },

          {
            path: 'reviews',
            loadComponent: () =>
              import('./doctors/reviews/reviews.component').then(
                (m) => m.ReviewsComponent,
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./doctors/register/register.component').then(
                (m) => m.RegisterComponent,
              ),
            children: [
              {
                path: 'doctor-register',
                loadComponent: () =>
                  import('./doctors/register/register.component').then(
                    (m) => m.RegisterComponent,
                  ),
              },
              {
                path: 'doctor-register-step1',
                loadComponent: () =>
                  import('./doctors/register/register.component').then(
                    (m) => m.RegisterComponent,
                  ),
              },
              {
                path: 'doctor-register-step2',
                loadComponent: () =>
                  import('./doctors/register/register.component').then(
                    (m) => m.RegisterComponent,
                  ),
              },
              {
                path: 'doctor-register-step3',
                loadComponent: () =>
                  import('./doctors/register/register.component').then(
                    (m) => m.RegisterComponent,
                  ),
              },
            ],
          },

          {
            path: 'blog',
            loadComponent: () =>
              import('./doctors/blog/blog.component').then(
                (m) => m.BlogComponent,
              ),
            children: [
              {
                path: 'doctor-blog',
                loadComponent: () =>
                  import('./doctors/blog/doctor-blog/doctor-blog.component').then(
                    (m) => m.DoctorBlogComponent,
                  ),
              },
              {
                path: 'doctor-add-blog',
                loadComponent: () =>
                  import('./doctors/blog/doctor-add-blog/doctor-add-blog.component').then(
                    (m) => m.DoctorAddBlogComponent,
                  ),
              },
              {
                path: 'edit-blog',
                loadComponent: () =>
                  import('./doctors/blog/edit-blog/edit-blog.component').then(
                    (m) => m.EditBlogComponent,
                  ),
              },
              {
                path: 'doctor-pending-blog',
                loadComponent: () =>
                  import('./doctors/blog/doctor-pending-blog/doctor-pending-blog.component').then(
                    (m) => m.DoctorPendingBlogComponent,
                  ),
              },
            ],
          },
          {
            path: 'doctor-change-password',
            loadComponent: () =>
              import('./doctors/doctor-change-password/doctor-change-password.component').then(
                (m) => m.DoctorChangePasswordComponent,
              ),
          },
          {
            path: 'doctor-search-grid',
            loadComponent: () =>
              import('./doctors/doctor-search-grid/doctor-search-grid.component').then(
                (m) => m.DoctorSearchGridComponent,
              ),
          },
          {
            path: 'edit-billing',
            loadComponent: () =>
              import('./doctors/edit-billing/edit-billing.component').then(
                (m) => m.EditBillingComponent,
              ),
          },
          {
            path: 'available-timings',
            loadComponent: () =>
              import('./doctors/schedule-timings/schedule-timings.component').then(
                (m) => m.ScheduleTimingsComponent,
              ),
          },
          {
            path: 'patient-details',
            loadComponent: () =>
              import('./doctors/patient-details/patient-details.component').then(
                (m) => m.PatientDetailsComponent,
              ),
          },
          {
            path: 'doctor-payment',
            loadComponent: () =>
              import('./doctors/doctor-payment/doctor-payment.component').then(
                (m) => m.DoctorPaymentComponent,
              ),
          },
          {
            path: 'appointments',
            loadComponent: () =>
              import('./doctors/appointments/appointments.component').then(
                (m) => m.AppointmentsComponent,
              ),
          },
          {
            path: 'settings',
            loadComponent: () =>
              import('./doctors/settings/settings.component').then(
                (m) => m.SettingsComponent,
              ),
            children: [
              {
                path: 'doctor-profile-settings',
                loadComponent: () =>
                  import('./doctors/settings/doctor-profile-settings/doctor-profile-settings.component').then(
                    (m) => m.DoctorProfileSettingsComponent,
                  ),
              },
              {
                path: 'doctor-insurance-settings',
                loadComponent: () =>
                  import('./doctors/settings/doctor-insurance-settings/doctor-insurance-settings.component').then(
                    (m) => m.DoctorInsuranceSettingsComponent,
                  ),
              },
              {
                path: 'doctor-business-settings',
                loadComponent: () =>
                  import('./doctors/settings/doctor-business-settings/doctor-business-settings.component').then(
                    (m) => m.DoctorBusinessSettingsComponent,
                  ),
              },
              {
                path: 'doctor-clinics-settings',
                loadComponent: () =>
                  import('./doctors/settings/doctor-clinics-settings/doctor-clinics-settings.component').then(
                    (m) => m.DoctorClinicsSettingsComponent,
                  ),
              },
              {
                path: 'doctor-education-settings',
                loadComponent: () =>
                  import('./doctors/settings/doctor-education-settings/doctor-education-settings.component').then(
                    (m) => m.DoctorEducationSettingsComponent,
                  ),
              },
              {
                path: 'doctor-experience-settings',
                loadComponent: () =>
                  import('./doctors/settings/doctor-experience-settings/doctor-experience-settings.component').then(
                    (m) => m.DoctorExperienceSettingsComponent,
                  ),
              },
              {
                path: 'doctor-awards-settings',
                loadComponent: () =>
                  import('./doctors/settings/doctor-awards-settings/doctor-awards-settings.component').then(
                    (m) => m.DoctorAwardsSettingsComponent,
                  ),
              },
            ],
          },
          {
            path: 'doctor-request',
            loadComponent: () =>
              import('./doctors/doctor-request/doctor-request.component').then(
                (m) => m.DoctorRequestComponent,
              ),
          },
          {
            path: 'doctor-specialities',
            loadComponent: () =>
              import('./doctors/doctor-specialities/doctor-specialities.component').then(
                (m) => m.DoctorSpecialitiesComponent,
              ),
          },
          {
            path: 'invoices',
            loadComponent: () =>
              import('./doctors/invoices/invoices.component').then(
                (m) => m.InvoicesComponent,
              ),
          },
        ],
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./patients/patients.component').then(
            (m) => m.PatientsComponent,
          ),
        children: [
          {
            path: 'booking',
            loadComponent: () =>
              import('./patients/booking/booking.component').then(
                (m) => m.BookingComponent,
              ),
            children: [
              {
                path: 'booking2',
                loadComponent: () =>
                  import('./patients/booking/booking2/booking2.component').then(
                    (m) => m.Booking2Component,
                  ),
              },
              {
                path: 'booking1',
                loadComponent: () =>
                  import('./patients/booking/booking1/booking1.component').then(
                    (m) => m.Booking1Component,
                  ),
              },
              {
                path: 'booking-success',
                loadComponent: () =>
                  import('./patients/booking/booking-success/booking-success.component').then(
                    (m) => m.BookingSuccessComponent,
                  ),
              },
              {
                path: 'booking-success-one',
                loadComponent: () =>
                  import('./patients/booking/booking-success-one/booking-success-one.component').then(
                    (m) => m.BookingSuccessOneComponent,
                  ),
              },
              // {
              //   path: 'booking-success-one',
              //   loadComponent: () => import('./patients/booking/booking-success-one/booking-success-one.component').then((m) => m.BookingSuccessOneComponent),
              // },
              {
                path: 'booking-popup',
                loadComponent: () =>
                  import('./patients/booking/booking-popup/booking-popup.component').then(
                    (m) => m.BookingPopupComponent,
                  ),
              },
            ],
          },
          {
            path: 'doctors',
            loadComponent: () =>
              import('./patients/doctors/doctors.component').then(
                (m) => m.DoctorsComponent,
              ),
            children: [
              {
                path: 'map-grid',
                loadComponent: () =>
                  import('./patients/doctors/map-grid/map-grid.component').then(
                    (m) => m.MapGridComponent,
                  ),
              },
              {
                path: 'map-list',
                loadComponent: () =>
                  import('./patients/doctors/map-list/map-list.component').then(
                    (m) => m.MapListComponent,
                  ),
              },
              {
                path: 'map-list-availability',
                loadComponent: () =>
                  import('./patients/doctors/map-list-availability/map-list-availability.component').then(
                    (m) => m.MapListAvailabilityComponent,
                  ),
              },
            ],
          },
          {
            path: 'search-doctor',
            loadComponent: () =>
              import('./patients/search-doctor/search-doctor.component').then(
                (m) => m.SearchDoctorComponent,
              ),
            children: [
              {
                path: 'search1',
                loadComponent: () =>
                  import('./patients/search-doctor/search1/search1.component').then(
                    (m) => m.Search1Component,
                  ),
              },
              {
                path: 'search2',
                loadComponent: () =>
                  import('./patients/search-doctor/search2/search2.component').then(
                    (m) => m.Search2Component,
                  ),
              },
              {
                path: 'doctor-grid',
                loadComponent: () =>
                  import('./patients/search-doctor/doctor-grid/doctor-grid.component').then(
                    (m) => m.DoctorGridComponent,
                  ),
              },
            ],
          },
          {
            path: 'doctor-profile',
            loadComponent: () =>
              import('./patients/doctor-profile/doctor-profile.component').then(
                (m) => m.DoctorProfileComponent,
              ),
            children: [
              {
                path: 'doctor-profile1',
                loadComponent: () =>
                  import('./patients/doctor-profile/doctor-profile1/doctor-profile1.component').then(
                    (m) => m.DoctorProfile1Component,
                  ),
              },
              {
                path: 'doctor-profile2',
                loadComponent: () =>
                  import('./patients/doctor-profile/doctor-profile2/doctor-profile2.component').then(
                    (m) => m.DoctorProfile2Component,
                  ),
              },
            ],
          },
          {
            path: 'checkout',
            loadComponent: () =>
              import('./patients/checkout/checkout.component').then(
                (m) => m.CheckoutComponent,
              ),
          },
          {
            path: 'patient-dashboard',
            loadComponent: () =>
              import('./patients/patient-dashboard/patient-dashboard.component').then(
                (m) => m.PatientDashboardComponent,
              ),
          },
          {
            path: 'favourites',
            loadComponent: () =>
              import('./patients/favourites/favourites.component').then(
                (m) => m.FavouritesComponent,
              ),
          },
          {
            path: 'chat',
            loadComponent: () =>
              import('./patients/chat/chat.component').then(
                (m) => m.ChatComponent,
              ),
          },
          {
            path: 'profile-settings',
            loadComponent: () =>
              import('./patients/profile-settings/profile-settings.component').then(
                (m) => m.ProfileSettingsComponent,
              ),
          },
          {
            path: 'change-password',
            loadComponent: () =>
              import('./patients/change-password/change-password.component').then(
                (m) => m.ChangePasswordComponent,
              ),
          },
          {
            path: 'vet-registration',
            loadComponent: () =>
              import('./patients/vet-registration/vet-registration.component').then(
                (m) => m.VetRegistrationComponent,
              ),
          },
          {
            path: 'booking-success',
            loadComponent: () =>
              import('./patients/booking/booking-success/booking-success.component').then(
                (m) => m.BookingSuccessComponent,
              ),
          },
          {
            path: 'consultation',
            loadComponent: () =>
              import('./patients/consultation/consultation.component').then(
                (m) => m.ConsultationComponent,
              ),
          },
          {
            path: 'dependent',
            loadComponent: () =>
              import('./patients/dependent/dependent.component').then(
                (m) => m.DependentComponent,
              ),
          },
          {
            path: 'payment',
            loadComponent: () =>
              import('./patients/payment/payment.component').then(
                (m) => m.PaymentComponent,
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./patients/register/register.component').then(
                (m) => m.RegisterComponent,
              ),
            children: [
              {
                path: 'patient-register-step1',
                loadComponent: () =>
                  import('./patients/register/patient-register-step1/patient-register-step1.component').then(
                    (m) => m.PatientRegisterStep1Component,
                  ),
              },
              {
                path: 'patient-register-step2',
                loadComponent: () =>
                  import('./patients/register/patient-register-step2/patient-register-step2.component').then(
                    (m) => m.PatientRegisterStep2Component,
                  ),
              },
              {
                path: 'patient-register-step3',
                loadComponent: () =>
                  import('./patients/register/patient-register-step3/patient-register-step3.component').then(
                    (m) => m.PatientRegisterStep3Component,
                  ),
              },
              {
                path: 'patient-register-step4',
                loadComponent: () =>
                  import('./patients/register/patient-register-step4/patient-register-step4.component').then(
                    (m) => m.PatientRegisterStep4Component,
                  ),
              },
              {
                path: 'patient-register-step5',
                loadComponent: () =>
                  import('./patients/register/patient-register-step5/patient-register-step5.component').then(
                    (m) => m.PatientRegisterStep5Component,
                  ),
              },
            ],
          },
          {
            path: 'medical-records',
            loadComponent: () =>
              import('./patients/medical-records/medical-records.component').then(
                (m) => m.MedicalRecordsComponent,
              ),
          },
          {
            path: 'medical-details',
            loadComponent: () =>
              import('./patients/medical-details/medical-details.component').then(
                (m) => m.MedicalDetailsComponent,
              ),
          },
          {
            path: 'patient-accounts',
            loadComponent: () =>
              import('./patients/patient-accounts/patient-accounts.component').then(
                (m) => m.PatientAccountsComponent,
              ),
          },
          {
            path: 'appointments',
            loadComponent: () =>
              import('./patients/appointments/appointments.component').then(
                (m) => m.AppointmentsComponent,
              ),
            children: [
              {
                path: 'patient-cancelled-appointment',
                loadComponent: () =>
                  import('./patients/appointments/patient-cancelled-appointment/patient-cancelled-appointment.component').then(
                    (m) => m.PatientCancelledAppointmentComponent,
                  ),
              },
              {
                path: 'patient-completed-appointment',
                loadComponent: () =>
                  import('./patients/appointments/patient-completed-appointment/patient-completed-appointment.component').then(
                    (m) => m.PatientCompletedAppointmentComponent,
                  ),
              },
              {
                path: 'patient-upcoming-appointment',
                loadComponent: () =>
                  import('./patients/appointments/patient-upcoming-appointment/patient-upcoming-appointment.component').then(
                    (m) => m.PatientUpcomingAppointmentComponent,
                  ),
              },
              {
                path: 'patient-appointments',
                loadComponent: () =>
                  import('./patients/appointments/patient-appointments/patient-appointments.component').then(
                    (m) => m.PatientAppointmentsComponent,
                  ),
              },
              {
                path: 'patient-appointment-details',
                loadComponent: () =>
                  import('./patients/appointments/patient-appoinment-details/patient-appoinment-details.component').then(
                    (m) => m.PatientAppoinmentDetailsComponent,
                  ),
              },
              {
                path: 'patient-appointment-grid',
                loadComponent: () =>
                  import('./patients/appointments/patient-appointment-grid/patient-appointment-grid.component').then(
                    (m) => m.PatientAppointmentGridComponent,
                  ),
              },
            ],
          },

          {
            path: 'patient-invoice',
            loadComponent: () =>
              import('./patients/patient-invoice/patient-invoice.component').then(
                (m) => m.PatientInvoiceComponent,
              ),
          },
          {
            path: 'doctor-profile',
            loadComponent: () =>
              import('./patients/doctor-profile/doctor-profile.component').then(
                (m) => m.DoctorProfileComponent,
              ),
          },
          {
            path: 'two-factor-authentication',
            loadComponent: () =>
              import('./patients/two-factor-authentication/two-factor-authentication.component').then(
                (m) => m.TwoFactorAuthenticationComponent,
              ),
          },
          {
            path: 'delete-account',
            loadComponent: () =>
              import('./patients/delete-account/delete-account.component').then(
                (m) => m.DeleteAccountComponent,
              ),
          },
        ],
      },
      {
        path: 'pharmacy',
        loadComponent: () =>
          import('./pharmacy/pharmacy.component').then(
            (m) => m.PharmacyComponent,
          ),
        children: [
          {
            path: 'pharmacy-index',
            loadComponent: () =>
              import('./pharmacy/pharmacy-index/pharmacy-index.component').then(
                (m) => m.PharmacyIndexComponent,
              ),
          },
          {
            path: 'pharmacy-details',
            loadComponent: () =>
              import('./pharmacy/pharmacy-details/pharmacy-details.component').then(
                (m) => m.PharmacyDetailsComponent,
              ),
          },
          {
            path: 'pharmacy-search',
            loadComponent: () =>
              import('./pharmacy/pharmacy-search/pharmacy-search.component').then(
                (m) => m.PharmacySearchComponent,
              ),
          },
          {
            path: 'product-all',
            loadComponent: () =>
              import('./pharmacy/product-all/product-all.component').then(
                (m) => m.ProductAllComponent,
              ),
          },
          {
            path: 'product-description',
            loadComponent: () =>
              import('./pharmacy/product-description/product-description.component').then(
                (m) => m.ProductDescriptionComponent,
              ),
          },
          {
            path: 'cart',
            loadComponent: () =>
              import('./pharmacy/cart/cart.component').then(
                (m) => m.CartComponent,
              ),
          },
          {
            path: 'product-checkout',
            loadComponent: () =>
              import('./pharmacy/product-checkout/product-checkout.component').then(
                (m) => m.ProductCheckoutComponent,
              ),
          },
          {
            path: 'payment-success',
            loadComponent: () =>
              import('./pharmacy/payment-success/payment-success.component').then(
                (m) => m.PaymentSuccessComponent,
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./pharmacy/register/register.component').then(
                (m) => m.RegisterComponent,
              ),
            children: [
              {
                path: 'pharmacy-register-step3',
                loadComponent: () =>
                  import('./pharmacy/register/pharmacy-register-step3/pharmacy-register-step3.component').then(
                    (m) => m.PharmacyRegisterStep3Component,
                  ),
              },
              {
                path: 'pharmacy-register-step2',
                loadComponent: () =>
                  import('./pharmacy/register/pharmacy-register-step2/pharmacy-register-step2.component').then(
                    (m) => m.PharmacyRegisterStep2Component,
                  ),
              },
              {
                path: 'pharmacy-register-step1',
                loadComponent: () =>
                  import('./pharmacy/register/pharmacy-register-step1/pharmacy-register-step1.component').then(
                    (m) => m.PharmacyRegisterStep1Component,
                  ),
              },
              {
                path: 'pharmacy-register',
                loadComponent: () =>
                  import('./pharmacy/register/pharmacy-register/pharmacy-register.component').then(
                    (m) => m.PharmacyRegisterComponent,
                  ),
              },
            ],
          },
        ],
      },
      {
        path: 'pages',
        loadComponent: () =>
          import('./pages/pages.component').then((m) => m.PagesComponent),
        children: [
          {
            path: 'about-us',
            loadComponent: () =>
              import('./pages/about-us/about-us.component').then(
                (m) => m.AboutUsComponent,
              ),
          },
          {
            path: 'blank-page',
            loadComponent: () =>
              import('./pages/blank-page/blank-page.component').then(
                (m) => m.BlankPageComponent,
              ),
          },
          {
            path: 'invoices',
            loadComponent: () =>
              import('./pages/invoices/invoices.component').then(
                (m) => m.InvoicesComponent,
              ),
            children: [
              {
                path: 'invoice-list',
                loadComponent: () =>
                  import('./pages/invoices/invoice-list/invoice-list.component').then(
                    (m) => m.InvoiceListComponent,
                  ),
              },
              {
                path: 'invoice-view',
                loadComponent: () =>
                  import('./pages/invoices/invoice-view/invoice-view.component').then(
                    (m) => m.InvoiceViewComponent,
                  ),
              },
            ],
          },
          {
            path: 'contact-us',
            loadComponent: () =>
              import('./pages/contact-us/contact-us.component').then(
                (m) => m.ContactUsComponent,
              ),
          },
          {
            path: 'call',
            loadComponent: () =>
              import('./pages/call/call.component').then(
                (m) => m.CallComponent,
              ),
            children: [
              {
                path: 'voice-call',
                loadComponent: () =>
                  import('./pages/call/voice-call/voice-call.component').then(
                    (m) => m.VoiceCallComponent,
                  ),
              },
              {
                path: 'video-call',
                loadComponent: () =>
                  import('./pages/call/video-call/video-call.component').then(
                    (m) => m.VideoCallComponent,
                  ),
              },
            ],
          },
          {
            path: 'pricing',
            loadComponent: () =>
              import('./pages/pricing/pricing.component').then(
                (m) => m.PricingComponent,
              ),
          },
          {
            path: 'faq',
            loadComponent: () =>
              import('./pages/faq/faq.component').then((m) => m.FaqComponent),
          },
          {
            path: 'maintenance',
            loadComponent: () =>
              import('./pages/maintenance/maintenance.component').then(
                (m) => m.MaintenanceComponent,
              ),
          },
          {
            path: 'coming-soon',
            loadComponent: () =>
              import('./pages/coming-soon/coming-soon.component').then(
                (m) => m.ComingSoonComponent,
              ),
          },
          {
            path: 'terms-condition',
            loadComponent: () =>
              import('./pages/terms-condition/terms-condition.component').then(
                (m) => m.TermsConditionComponent,
              ),
          },
          {
            path: 'privacy-policy',
            loadComponent: () =>
              import('./pages/privacy-policy/privacy-policy.component').then(
                (m) => m.PrivacyPolicyComponent,
              ),
          },
          {
            path: 'components',
            loadComponent: () =>
              import('./pages/components/components.component').then(
                (m) => m.ComponentsComponent,
              ),
          },
          {
            path: 'social-media',
            loadComponent: () =>
              import('./pages/social-media/social-media.component').then(
                (m) => m.SocialMediaComponent,
              ),
          },
          {
            path: 'signup',
            loadComponent: () =>
              import('./pages/signup/signup.component').then(
                (m) => m.SignupComponent,
              ),
          },
          {
            path: 'clinic',
            loadComponent: () =>
              import('./pages/clinic/clinic.component').then(
                (m) => m.ClinicComponent,
              ),
          },
          {
            path: 'speciality',
            loadComponent: () =>
              import('./pages/speciality/speciality.component').then(
                (m) => m.SpecialityComponent,
              ),
          },
          {
            path: 'hospitals',
            loadComponent: () =>
              import('./pages/hospitals/hospitals.component').then(
                (m) => m.HospitalsComponent,
              ),
          },
          {
            path: 'booking',
            loadComponent: () =>
              import('./pages/booking/booking.component').then(
                (m) => m.BookingComponent,
              ),
          },
        ],
      },

      {
        path: 'blog',
        loadComponent: () =>
          import('./blog/blog.component').then((m) => m.BlogComponent),
        children: [
          {
            path: 'blog-details',
            loadComponent: () =>
              import('./blog/blog-details/blog-details.component').then(
                (m) => m.BlogDetailsComponent,
              ),
          },
          {
            path: 'blog-grid',
            loadComponent: () =>
              import('./blog/blog-grid/blog-grid.component').then(
                (m) => m.BlogGridComponent,
              ),
          },
          {
            path: 'blog-list',
            loadComponent: () =>
              import('./blog/blog-list/blog-list.component').then(
                (m) => m.BlogListComponent,
              ),
          },
        ],
      },
    ],
  },
] as const;
