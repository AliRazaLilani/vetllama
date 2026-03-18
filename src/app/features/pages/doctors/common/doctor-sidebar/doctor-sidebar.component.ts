import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.scss'],
  imports: [CommonModule, RouterModule, RouterLink, MatSelectModule],
})
export class DoctorSidebarComponent {
  routes = routes;
  public base = '';
  public page = '';
  public last = '';

  constructor(private common: CommonService, private router: Router) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    // console.log('base', this.base);
    // console.log('page', this.page);
    // console.log('last', this.last);
  }
}
