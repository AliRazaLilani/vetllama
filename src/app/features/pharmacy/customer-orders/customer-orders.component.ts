import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
  imports: [RouterLink],
})
export class CustomerOrdersComponent {
  public routes = routes;
}
