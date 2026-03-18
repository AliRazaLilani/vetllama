import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientSidebarComponent } from '../common/patient-sidebar/patient-sidebar.component';
import { PatientBreadcrumbComponent } from '../common/patient-breadcrumb/patient-breadcrumb.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  imports: [
    RouterLink,
    MatSelectModule,
    PatientSidebarComponent,
    PatientBreadcrumbComponent,
    BsDatepickerModule,
  ],
})
export class ProfileSettingsComponent implements OnInit {
  public routes = routes;
  date = new Date();
  myDateValue!: Date;
  ngOnInit() {
    this.myDateValue = new Date();
  }

  onDateChange(newDate: Date) {
    // console.log(newDate);
  }
}
