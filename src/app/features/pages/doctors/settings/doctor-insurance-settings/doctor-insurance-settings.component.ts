import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';

@Component({
  selector: 'app-doctor-insurance-settings',
  templateUrl: './doctor-insurance-settings.component.html',
  styleUrl: './doctor-insurance-settings.component.scss',
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
  ],
})
export class DoctorInsuranceSettingsComponent {
  public routes = routes;
  education: Array<number> = [];

  addEducationFunc() {
    this.education.push(1);
  }
  deleteEducationFunc(index: number) {
    this.education.splice(index, 1);
  }
}
