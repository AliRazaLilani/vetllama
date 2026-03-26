import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { CommonService } from 'src/app/core/services/common/common.service';
import { PatientBreadcrumbComponent } from '../../common/patient-breadcrumb/patient-breadcrumb.component';
@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss'],
  imports: [RouterLink, PatientBreadcrumbComponent],
})
export class BookingSuccessComponent {
  public routes = routes;
  public base = 'index-6';

  constructor(
    private router: Router,
    private commonService: CommonService,
  ) {
    this.commonService.base.next('index-6');
  }
}
