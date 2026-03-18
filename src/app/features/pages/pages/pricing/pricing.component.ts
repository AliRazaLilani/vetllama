import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class PricingComponent {
  public routes = routes;

}
