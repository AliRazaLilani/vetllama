import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
interface education {}

@Component({
  selector: 'app-doctor-clinics-settings',
  templateUrl: './doctor-clinics-settings.component.html',
  styleUrl: './doctor-clinics-settings.component.scss',
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
    MatSelectModule,
  ],
})
export class DoctorClinicsSettingsComponent {
  public routes = routes;
  education: Array<education> = [];

  addEducationFunc() {
    this.education.push(1);
  }
  deleteEducationFunc(index: number) {
    this.education.splice(index, 1);
  }
}
