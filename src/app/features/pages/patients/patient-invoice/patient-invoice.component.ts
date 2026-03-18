import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientSidebarComponent } from '../common/patient-sidebar/patient-sidebar.component';
import { PatientBreadcrumbComponent } from '../common/patient-breadcrumb/patient-breadcrumb.component';

@Component({
  selector: 'app-patient-invoice',
  templateUrl: './patient-invoice.component.html',
  styleUrl: './patient-invoice.component.scss',
  imports: [RouterLink, PatientSidebarComponent, PatientBreadcrumbComponent],
})
export class PatientInvoiceComponent {
  public routes = routes;
}
