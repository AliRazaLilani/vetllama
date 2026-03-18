import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientSidebarComponent } from '../common/patient-sidebar/patient-sidebar.component';
import { PatientBreadcrumbComponent } from '../common/patient-breadcrumb/patient-breadcrumb.component';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
  imports: [RouterLink, PatientSidebarComponent, PatientBreadcrumbComponent],
})
export class DeleteAccountComponent {
  routes = routes;
}
