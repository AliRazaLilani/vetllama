import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from '../../core/services/common/common.service';
import { DataService } from '../../core/services/data/data.service';
import { header } from '../../core/model/sidebar-model';
import { routes } from '../../core/routes/routes';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-pharmacyheader',
  templateUrl: './pharmacyheader.component.html',
  styleUrls: ['./pharmacyheader.component.scss'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class PharmacyheaderComponent {
  public routes = routes;
  public searchField = false;

  public header: header[];
  base = '';
  page = '';
  last = '';
  public white_bg = false;
  sticky = false;
  elementPosition = 0;
  isdark = true;
  islight = false;
  themeColor = 'light-mode';

  @HostListener('window:scroll')
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if (windowScroll == 0) {
      this.white_bg = false;
    } else {
      this.white_bg = true;
    }
  }

  constructor(
    private common: CommonService,
    private data: DataService,
    public sidebar: SidebarService,
    private router: Router
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
    this.header = this.data.header;
  }

  public toggleSidebar(): void {
    this.sidebar.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebar.closeSidebar();
  }
  toggleSearch() {
    this.searchField = !this.searchField;
  }
  public navigation() {
    this.router.navigate([routes.search1]);
  }
  ngOnInit(): void {
    const themeColor = localStorage.getItem('themeColor') || 'light-mode';
    this.sidebar.changeThemeColor(themeColor);
  }
  darkMode(): void {
    this.isdark = !this.isdark;
    this.islight = !this.islight;
  }
}
