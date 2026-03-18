import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/app/core/services/common/common.service';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-breadcrumb-search',
  templateUrl: './breadcrumb-search.component.html',
  styleUrls: ['./breadcrumb-search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
})
export class BreadcrumbSearchComponent {
  public routes = routes;

  base = '';
  page = '';
  last = '';
  constructor(private common: CommonService, private router: Router) {
    this.common.base.subscribe((res: string) => {
      this.base = res?.replaceAll('-', ' ');
    });
    this.common.page.subscribe((res: string) => {
      if (res === 'chat') {
        this.page = 'Message';
      } else if (res === 'appointments') {
        this.page = 'Patient Appointments';
      } else if (res === 'patient-accounts') {
        this.page = 'Accounts';
      } else if (res === 'patient-invoice') {
        this.page = 'Invoices';
      } else {
        this.last = this.page;
        this.page = res?.replaceAll('-', ' ');
      }
    });
    this.common.last.subscribe((res: string) => {
      this.last = res?.replaceAll('-', ' ');
    });
  }
  onSubmit(): void {
    this.router.navigateByUrl('/patients/search-doctor/search1');
  }
}
