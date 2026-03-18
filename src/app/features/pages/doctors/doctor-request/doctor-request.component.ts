import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-doctor-request',
  templateUrl: './doctor-request.component.html',
  styleUrls: ['./doctor-request.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
    MatSelectModule,
    MatSliderModule,
  ],
})
export class DoctorRequestComponent {
  public routes = routes;
}
