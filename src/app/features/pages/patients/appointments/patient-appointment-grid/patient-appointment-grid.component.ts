import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientSidebarComponent } from '../../common/patient-sidebar/patient-sidebar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PatientBreadcrumbComponent } from '../../common/patient-breadcrumb/patient-breadcrumb.component';

@Component({
  selector: 'app-patient-appointment-grid',
  templateUrl: './patient-appointment-grid.component.html',
  styleUrls: ['./patient-appointment-grid.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    BsDatepickerModule,
    FormsModule,
    PatientSidebarComponent,
    PatientBreadcrumbComponent,
  ],
})
export class PatientAppointmentGridComponent {
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
