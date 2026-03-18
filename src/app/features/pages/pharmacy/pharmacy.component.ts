import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss'],
  imports: [RouterModule],
})
export class PharmacyComponent {
  public routes = routes;
}
