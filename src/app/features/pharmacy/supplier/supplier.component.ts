import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  imports: [RouterModule],
})
export class SupplierComponent {
  public routes = routes;
}
