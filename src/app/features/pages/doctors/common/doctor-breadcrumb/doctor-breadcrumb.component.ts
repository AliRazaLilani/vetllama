import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-doctor-breadcrumb',
  templateUrl: './doctor-breadcrumb.component.html',
  styleUrls: ['./doctor-breadcrumb.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class DoctorBreadcrumbComponent {
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';

  constructor(private common: CommonService, private router: Router) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      if (res === 'doctor-dashboard') {
        this.page = 'Dashboard';
      } else if (res === 'chat-doctor') {
        this.page = 'Message';
      } else if (res === 'settings') {
        this.page = 'Doctor Profile';
      } else if (res === 'doctor-change-password') {
        this.page = 'Change Password';
      } else if (res === 'doctor-payment') {
        this.page = 'Payout Settings';
      } else {
        this.page = res?.replaceAll('-', ' ');
      }
    });
    this.common.last.subscribe((res: string) => {
      if (res === 'doctor-appointment-start') {
        this.last = 'Appointment Detail';
      } else if (res === 'doctor-appointment-details') {
        this.last = 'Appointment Detail';
      } else if (res === 'doctor-completed-appointment') {
        this.last = 'Appointment Detail';
      } else if (res === 'doctor-cancelled-appointment') {
        this.last = 'Appointment Detail';
      } else if (res === 'doctor-cancelled-appointment2') {
        this.last = 'Appointment Detail';
      } else if (res === 'doctor-upcoming-appointment-details') {
        this.last = 'Appointment Detail';
      } else {
        this.last = res?.replaceAll('-', ' ');
      }
    });
    // console.log('base', this.base);
    // console.log('page', this.page);
    // console.log('last', this.last);
  }
}
