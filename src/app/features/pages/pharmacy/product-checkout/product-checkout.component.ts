import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss'],
  imports: [RouterLink],
})
export class ProductCheckoutComponent {
  public routes = routes;
  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.paymentSuccess]);
  }
}
