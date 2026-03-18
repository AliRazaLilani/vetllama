import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatSelectModule,
    BsDatepickerModule,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
  ],
})
export class MyPatientsComponent {
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
