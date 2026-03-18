import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientBreadcrumbComponent } from '../common/patient-breadcrumb/patient-breadcrumb.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [RouterLink, PatientBreadcrumbComponent, CarouselModule],
})
export class CheckoutComponent {
  public routes = routes;
  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.bookingSuccess]);
  }
}
