import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { pharmacySidebar } from 'src/app/core/models/sidebar-model';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { routes } from 'src/app/core/routes/routes';
import { NgScrollbarModule } from 'ngx-scrollbar';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterLink, RouterLinkActive, NgScrollbarModule],
})
export class SidebarComponent {
  public routes = routes;
  base = '';
  page = '';
  last = '';
  public pharmacySidebar: Array<pharmacySidebar> = [];
  public miniSidebar = false;
  public multilevel: Array<boolean> = [false, false, false];

  constructor(
    private sidebar: SidebarService,
    private common: CommonService,
    private data: DataService
  ) {
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    this.pharmacySidebar = this.data.pharmacySidebar;
    this.sidebar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }
  public expandSubMenus(menu: {
    menuValue: string;
    showSubRoute: boolean;
  }): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.pharmacySidebar.map((mainMenus) => {
      mainMenus.menu.map(
        (resMenu: { menuValue: string; showSubRoute: boolean }) => {
          if (resMenu.menuValue == menu.menuValue) {
            menu.showSubRoute = !menu.showSubRoute;
          } else {
            resMenu.showSubRoute = false;
          }
        }
      );
    });
  }
  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }
  public toggleAdminSideBar(): void {
    this.sidebar.switchAdminSideMenuPosition();
  }
  public toggleAdminMobileSideBar(): void {
    this.sidebar.switchAdminMobileSideBarPosition();
  }
  miniSideBarBlur(position: string) {
    if (position === 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }

  miniSideBarFocus(position: string) {
    if (position === 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }
}
