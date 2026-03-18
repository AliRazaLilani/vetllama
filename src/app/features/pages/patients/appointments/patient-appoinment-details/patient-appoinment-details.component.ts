import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PatientSidebarComponent } from '../../common/patient-sidebar/patient-sidebar.component';
import { PatientBreadcrumbComponent } from '../../common/patient-breadcrumb/patient-breadcrumb.component';

@Component({
  selector: 'app-patient-appoinment-details',
  templateUrl: './patient-appoinment-details.component.html',
  styleUrls: ['./patient-appoinment-details.component.scss'],
  imports: [
    RouterLink,
    BsDatepickerModule,
    FormsModule,
    PatientSidebarComponent,
    PatientBreadcrumbComponent,
  ],
})
export class PatientAppoinmentDetailsComponent {
  public routes = routes;
}
