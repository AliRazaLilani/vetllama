import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-schedule-timings',
  templateUrl: './schedule-timings.component.html',
  styleUrls: ['./schedule-timings.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
    MatSelectModule,
    RouterLink
  ],
})
export class ScheduleTimingsComponent {
  public routes = routes;
  public isClassAdded: boolean[] = [false];

  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }
}
