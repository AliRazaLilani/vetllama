import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  imports: [RouterModule],
})
export class PurchaseComponent {
  public routes = routes;
}
