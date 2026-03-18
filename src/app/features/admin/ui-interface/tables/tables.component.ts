import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  imports: [RouterModule],
})
export class TablesComponent {
  public routes = routes;
}
