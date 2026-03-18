import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
@Component({
  selector: 'app-doctor-change-password',
  templateUrl: './doctor-change-password.component.html',
  styleUrls: ['./doctor-change-password.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
  ],
})
export class DoctorChangePasswordComponent {
  public routes = routes;

  public password: boolean[] = [false];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
}
