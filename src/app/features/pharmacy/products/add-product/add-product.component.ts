import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  imports: [RouterLink, BsDatepickerModule],
})
export class AddProductComponent {
  public routes = routes;
}
