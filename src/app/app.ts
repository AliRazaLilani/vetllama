import { CommonModule } from '@angular/common';
import { ApplicationRef, Component, signal } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event as RouterEvent,
  RouterOutlet,
} from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastModule } from 'primeng/toast';
import { routes } from './core/routes/routes';
import { CommonService } from './core/services/common/common.service';
import { DataService } from './core/services/data/data.service';
import { SidebarService } from './core/services/sidebar/sidebar.service';
import { url } from './core/models/models';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ToastModule, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('vetlama-marketing');
  base = '';
  page = '';
  last = '';
  public routes = routes;
  public miniSidebar = false;
  public expandMenu = false;
  public mobileSidebar = false;
  public showMiniSidebar = false;
  public loading = true;
  private appStable = false;
  private navigationComplete = false;

  constructor(
    private common: CommonService,
    private router: Router,
    private data: DataService,
    private sidebar: SidebarService,
    private appRef: ApplicationRef,
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.appRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
      this.appStable = true;
      this.tryHidePreloader();
    });

    this.router.events.subscribe((data: RouterEvent) => {
      // console.log('base',this.base);
      // console.log('page',this.page);
      // console.log('last',this.last);
      if (data instanceof NavigationStart) {
        this.navigationComplete = false;
        this.getRoutes(data);
        this.mobileSidebar = false;
        localStorage.removeItem('isMobileSidebar');
        localStorage.removeItem('sidebarPosition');
      }
      if (data instanceof NavigationEnd) {
        this.navigationComplete = true;
        this.showMiniSidebar = false;
        if (this.loading) {
          this.loading = false;
          this.tryHidePreloader();
        }
      }
      if (data instanceof NavigationError) {
        this.navigationComplete = true;
        this.loading = false;
        this.tryHidePreloader();
      }
    });
    this.sidebar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.sidebar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    this.sidebar.expandSideBar.subscribe((res) => {
      this.expandMenu = res;
      if (res == false && this.miniSidebar == true) {
        this.data.adminSidebar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      if (res == true && this.miniSidebar == true) {
        this.data.adminSidebar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });
    this.sidebar.toogleUserSidebar.subscribe((res: string) => {
      if (res == 'true') {
        this.showMiniSidebar = true;
      } else {
        this.showMiniSidebar = false;
      }
    });
  }

  public getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
  }

  private tryHidePreloader() {
    if (this.loading === false && this.navigationComplete && this.appStable) {
      if (typeof window !== 'undefined' && (window as any).__setAppReady) {
        (window as any).__setAppReady();
      } else if (typeof window !== 'undefined' && (window as any).__hideAppPreloader) {
        (window as any).__hideAppPreloader();
      } else {
        document.getElementById('app-preloader')?.remove();
      }
    }
  }
}
