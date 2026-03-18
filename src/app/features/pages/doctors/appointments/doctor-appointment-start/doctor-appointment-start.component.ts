import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';

interface medical {}
@Component({
  selector: 'app-doctor-appointment-start',
  templateUrl: './doctor-appointment-start.component.html',
  styleUrls: ['./doctor-appointment-start.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
    BsDatepickerModule,
    MatSelectModule,
  ],
})
export class DoctorAppointmentStartComponent {
  public routes = routes;
  values1: string[] = ['Skin Allergy'];
  values2: string[] = ['Hemoglobin A1c (HbA1c)', 'Liver Function Tests (LFTs)'];
  values3: string[] = ['Fever', 'Headache', 'Stomach Pain'];

  medical: medical[] = [{}];

  addMedical() {
    this.medical.push({});
  }

  dltMedical(index: number) {
    this.medical.splice(index, 1);
  }
}
