import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/routes/routes';
import { CommonService } from 'src/app/core/services/common/common.service';
import { PatientBreadcrumbComponent } from '../common/patient-breadcrumb/patient-breadcrumb.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [RouterLink, PatientBreadcrumbComponent, CarouselModule],
})
export class CheckoutComponent {
  public routes = routes;
  public base = 'index-6';

  constructor(
    private router: Router,
    private commonService: CommonService,
  ) {
    this.commonService.base.next('index-6');
  }

  public navigation() {
    this.router.navigate([routes.bookingSuccess]);
  }
}
