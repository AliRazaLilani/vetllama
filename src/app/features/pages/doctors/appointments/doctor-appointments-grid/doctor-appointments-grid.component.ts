import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-doctor-appointments-grid',
  templateUrl: './doctor-appointments-grid.component.html',
  styleUrls: ['./doctor-appointments-grid.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
    BsDatepickerModule,
  ],
})
export class DoctorAppointmentsGridComponent {
  public routes = routes;
  public filter = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  public showFilter() {
    this.filter = !this.filter;
  }
}
