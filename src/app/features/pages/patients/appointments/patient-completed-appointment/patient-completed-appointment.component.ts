import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientSidebarComponent } from '../../common/patient-sidebar/patient-sidebar.component';
import { PatientBreadcrumbComponent } from '../../common/patient-breadcrumb/patient-breadcrumb.component';

@Component({
  selector: 'app-patient-completed-appointment',
  templateUrl: './patient-completed-appointment.component.html',
  styleUrls: ['./patient-completed-appointment.component.scss'],
  imports: [RouterLink, PatientSidebarComponent, PatientBreadcrumbComponent],
})
export class PatientCompletedAppointmentComponent {
  public routes = routes;
}
