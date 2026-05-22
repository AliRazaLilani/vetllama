import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data/data.service';
import { routes } from '../../routes/routes';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private renderer: Renderer2;
  routes = routes
  public toogleUserSidebar: BehaviorSubject<string> =
    new BehaviorSubject<string>(localStorage.getItem('sidebarPosition') || '');

  public toggleSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMiniSidebar') || 'false'
  );

  public toggleMobileSideBar: BehaviorSubject<string> =
    new BehaviorSubject<string>(
      localStorage.getItem('isMobileSidebar') || 'false'
    );

  //theme
  public themeColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('themeColor') || 'light-mode'
  );

  public expandSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(rendererFactory: RendererFactory2, private data: DataService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public switchAdminSideMenuPosition(): void {
    if (localStorage.getItem('isMiniSidebar')) {
      this.toggleSideBar.next('false');
      localStorage.removeItem('isMiniSidebar');
      this.data.adminSidebar.map((mainMenus) => {
        mainMenus.menu.map((resMenu) => {
          const menuValue = sessionStorage.getItem('menuValue');
          if (menuValue && menuValue == resMenu.menuValue) {
            resMenu.showSubRoute = true;
          }
        });
      });
    } else {
      this.toggleSideBar.next('true');
      localStorage.setItem('isMiniSidebar', 'true');
      this.data.adminSidebar.map((mainMenus) => {
        mainMenus.menu.map((resMenu) => {
          resMenu.showSubRoute = false;
        });
      });
    }
  }

  public switchAdminMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next('false');
      localStorage.removeItem('isMobileSidebar');
      document.body.style.overflow = '';
      document
        .querySelector('.sidebar-overlay.opened')
        ?.classList.remove('opened');
    } else {
      this.toggleMobileSideBar.next('true');
      localStorage.setItem('isMobileSidebar', 'true');
      document.body.style.overflow = 'hidden';
      document.querySelector('.sidebar-overlay')?.classList.add('opened');
    }
  }

  public openSidebar(): void {
    // to set sidebar position app component html using "menu-opened" class
    if (localStorage.getItem('sidebarPosition')) {
      localStorage.removeItem('sidebarPosition');
      this.toogleUserSidebar.next('false');
    } else {
      localStorage.setItem('sidebarPosition', 'true');
      this.toogleUserSidebar.next('true');
    }
  }

  public closeSidebar(): void {
    // hide sidebar
    this.toogleUserSidebar.next('false');
    localStorage.removeItem('sidebarPosition');
  }
  themeMode = '';
  public changeThemeColor(themeColor: string): void {

    this.themeColor.next(themeColor);
    localStorage.setItem('themeColor', themeColor);
    this.renderer.setAttribute(
      document.documentElement,
      'class',
      themeColor === 'light-mode' ? 'light-mode' : 'dark-mode'
    );

  }


  public Home_Header = [
    // {
    //   tittle: 'Home',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: 'General Home 1',
    //       img: 'assets/img/home/home.jpg',
    //       route: routes.index,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'General Home 2',
    //       img: 'assets/img/home/home-01.jpg',
    //       route: routes.index2,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-2',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Dental',
    //       img: 'assets/img/home/home-02.jpg',
    //       route: routes.index3,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-3',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Pediatrics',
    //       img: 'assets/img/home/home-03.jpg',
    //       route: routes.index4,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-4',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'ENT',
    //       img: 'assets/img/home/home-04.jpg',
    //       route: routes.index5,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-5',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Veterinary',
    //       img: 'assets/img/home/home-05.jpg',
    //       route: routes.index6,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-6',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Cardiology',
    //       img: 'assets/img/home/home-06.jpg',
    //       route: routes.index7,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-7',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Eye Care',
    //       img: 'assets/img/home/home-07.jpg',
    //       route: routes.index8,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-8',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Home Care',
    //       img: 'assets/img/home/home-08.jpg',
    //       route: routes.index9,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-9',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Fertility',
    //       img: 'assets/img/home/home-09.jpg',
    //       route: routes.index10,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-10',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Cosmetic Surgery',
    //       img: 'assets/img/home/home-10.jpg',
    //       route: routes.index11,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-11',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Laboratory',
    //       img: 'assets/img/home/home-11.jpg',
    //       route: routes.index12,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-12',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Pharmacy',
    //       img: 'assets/img/home/home-12.jpg',
    //       route: routes.index13,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'index-13',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Coming Soon',
    //       img: 'assets/img/home/coming-soon.jpg',
    //       route: routes.index13,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'home14',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Coming Soon',
    //       img: 'assets/img/home/coming-soon.jpg',
    //       route: routes.home14,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       base: 'home14',
    //       subMenus: [],
    //     },
    //   ],
    // },
    // {
    //   tittle: 'Doctors',
    //   showAsTab: false,
    //   separateRoute: false,
    //   base: 'doctors',
    //   img:'assets/img/home/menu-img-1.jpg',
    //   row:'1',
    //   menu: [
    //     {
    //       menuValue: 'Doctor Dashboard',
    //       route: routes.doctorDashboard,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       page: 'doctor-dashboard',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Appointments',
    //       route: routes.appointmentsListUser,
    //       page: 'appointments',
    //       last2: 'doctor-appointments-grid',
    //       last3: 'doctor-appointment-start',
    //       page2: 'doctor-request',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Available Timings',
    //       route: routes.scheduleTimings,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //       page: 'available-timings',
    //     },
    //     {
    //       menuValue: 'Patients List',
    //       route: routes.myPatients,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       page: 'my-patients',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Chat',
    //       route: routes.chatDoctor,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       page: 'chat-doctor',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Invoices',
    //       route: routes.doctorInvoices,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       page: 'Invoices',
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Profile Settings',
    //       route: routes.doctorProfileSettings,
    //       page: 'settings',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       last: 'doctor-profile-settings',
    //       subMenus: [],
    //     }
    //   ],
    // },
    // {
    //   tittle: 'Patients',
    //   base: 'patients',
    //   showAsTab: false,
    //   separateRoute: false,
    //   img:'assets/img/home/menu-img-2.jpg',
    //   row:'2',
    //   menu: [
    //     {
    //       menuValue: '',
    //       route:'',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       col:'1',
    //       subMenus: [
    //         {
    //           menuValue: 'Patient Dashboard',
    //           route: routes.patientDashboard,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //       menuValue: 'Doctors Grid',
    //       route: routes.doctorGrid,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //       },
    //     {
    //       menuValue: 'Doctors List',
    //       route: routes.mapList,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Doctors Availability',
    //       route: routes.mapListAvailability,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Booking',
    //       hasSubRoute: true,
    //       route: routes.booking,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Booking 1',
    //       hasSubRoute: true,
    //       route: routes.booking1,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Booking 2',
    //       hasSubRoute: true,
    //       route: routes.booking2,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Booking Popup',
    //       hasSubRoute: true,
    //       route: routes.bookingPopup,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //       ],
    //     },
    //     {
    //       menuValue: '',
    //       route:'',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       col:'2',
    //       subMenus: [
    //         {
    //       menuValue: 'Search Doctor 1',
    //       route: routes.search1,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Search Doctor 2',
    //       route: routes.search2,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Doctor Profile 1',
    //       route: routes.doctorProfile1,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Doctor Profile 2',
    //       route: routes.doctorProfile2,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Checkout',
    //       route: routes.checkout,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },

    //     {
    //       menuValue: 'Favourites',
    //       route: routes.favourites,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Chat',
    //       route: routes.chat,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],

    //     },
    //     {
    //       menuValue: 'Profile Settings',
    //       route: routes.profileSettings,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,

    //       subMenus: [],
    //     }
    //       ]
    //     },

    //   ],
    // },
    // {
    //   tittle: 'Pharmacy',
    //   showAsTab: false,
    //   separateRoute: false,
    //   base: 'pharmacy',
    //   row:'1',
    //   img:'assets/img/home/menu-img-3.jpg',
    //   menu: [
    //     {
    //       menuValue: 'Pharmacy',
    //       route: routes.index13,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Pharmacy Details',
    //       route: routes.pharmacyDetails,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Pharmacy Search',
    //       route: routes.pharmacySearch,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Product',
    //       route: routes.productAll,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Product Description',
    //       route: routes.productDescription,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Cart',
    //       route: routes.cart,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Product Checkout',
    //       route: routes.productCheckout,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Payment Success',
    //       route: routes.paymentSuccess,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Pharmacy Register',
    //       route: routes.pharmacyregister,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //   ],
    // },
    // {
    //   tittle: 'Pages',
    //   showAsTab: false,
    //   separateRoute: false,
    //   base: 'pages',
    //   row:'3',
    //   menu: [
    //     {
    //       menuValue: '',
    //       route:'',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       col:'1',
    //       subMenus: [
    //         {
    //       menuValue: 'About Us',
    //       route: routes.aboutUs,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Contact Us',
    //       route: routes.contactUs,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Hospitals',
    //       route: routes.Hospitals,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //      {
    //       menuValue: 'Speciality',
    //       route: routes.Speciality,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Clinic',
    //       route: routes.Clinic,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //           menuValue: 'Starter Page',
    //           route: routes.userBlankPage,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Pricing Plan',
    //           route: routes.pricing,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'FAQ',
    //           route: routes.faq,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //       ]
    //     },
    //      {
    //       menuValue: '',
    //       route:'',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       col:'2',
    //       subMenus: [
    //         {
    //           menuValue: 'Login Email',
    //           route: routes.loginEmail,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Login Phone',
    //           route: routes.loginPhone,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Doctor Signup',
    //           route: routes.doctorSignup,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Patient Signup',
    //           route: routes.patientSignup,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Forgot Password 1',
    //           route: routes.forgotPassword,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Forgot Password 2',
    //           route: routes.forgotPassword2,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Email OTP',
    //           route: routes.loginEmailOtp,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Phone OTP',
    //           route: routes.loginPhoneOtp,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //       ]
    //      },
    //      {
    //       menuValue: '',
    //       route:'',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       col:'3',
    //       subMenus: [
    //         {
    //           menuValue: 'Maintenance',
    //           route: routes.maintenance,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Coming Soon',
    //           route: routes.comingSoon,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Terms & Condition',
    //           route: routes.termsCondition,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Privacy Policy',
    //           route: routes.privacyPolicy,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Components',
    //           route: routes.userComponents,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           openInNewTab: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Invoices',
    //           route: routes.doctorInvoices,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Invoices View',
    //           route: routes.invoiceView,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //       ]
    //      },
    //      {
    //       menuValue: '',
    //       route:'',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       col:'4',
    //       subMenus: [
    //         {
    //           menuValue: 'Voice Call',
    //           route: routes.voiceCall,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: 'Video Call',
    //           route: routes.videoCall,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //          {
    //           menuValue: '404 Error',
    //           route: routes.userError404,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //         {
    //           menuValue: '500 Error',
    //           route: routes.userError500,
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           subMenus: [],
    //         },
    //       ]
    //      },
    //   ],
    // },
    // {
    //   tittle: 'Blog',
    //   showAsTab: false,
    //   separateRoute: false,
    //   base: 'blog',
    //   menu: [
    //     {
    //       menuValue: 'Blog List',
    //       route: routes.blogList,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Blog Grid',
    //       route: routes.blogGrid,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Blog Details',
    //       route: routes.blogDetails,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       openInNewTab: false,
    //       subMenus: [],
    //     },
    //   ],
    // },
    // {
    //   tittle: 'Admin',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: 'Admin',
    //       route: routes.adminLogin,
    //       openInNewTab: true,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       subMenus: [],
    //     },
    //     {
    //       menuValue: 'Pharmacy Admin',
    //       route: routes.pharmacyLogin,
    //       openInNewTab: true,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       subMenus: [],
    //     },
    //   ],
    // },
  ];
}
