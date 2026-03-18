import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-doctor-education-settings',
  templateUrl: './doctor-education-settings.component.html',
  styleUrl: './doctor-education-settings.component.scss',
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
    MatSelectModule,
    BsDatepickerModule,
  ],
})
export class DoctorEducationSettingsComponent {
  public routes = routes;
  education: Array<number> = [];

  addEducationFunc() {
    this.education.push(1);
  }
  deleteEducationFunc(index: number) {
    this.education.splice(index, 1);
  }
}
