import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
interface award {}
@Component({
  selector: 'app-doctor-awards-settings',
  templateUrl: './doctor-awards-settings.component.html',
  styleUrls: ['./doctor-awards-settings.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
    MatSelectModule,
    BsDatepickerModule,
  ],
})
export class DoctorAwardsSettingsComponent {
  public routes = routes;
  award: Array<award> = [];

  addAward() {
    this.award.push(1);
  }
}
