import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientSidebarComponent } from '../common/patient-sidebar/patient-sidebar.component';
import { PatientBreadcrumbComponent } from '../common/patient-breadcrumb/patient-breadcrumb.component';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    PatientSidebarComponent,
    PatientBreadcrumbComponent,
  ],
})
export class ChangePasswordComponent {
  public routes = routes;

  public password: boolean[] = [false];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
}
