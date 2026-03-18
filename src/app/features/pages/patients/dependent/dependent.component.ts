import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.scss'],
  imports: [RouterModule],
})
export class DependentComponent {
  public routes = routes;
}
