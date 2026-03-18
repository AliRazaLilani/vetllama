import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tables-basic',
  templateUrl: './tables-basic.component.html',
  styleUrls: ['./tables-basic.component.scss'],
  imports: [RouterLink],
})
export class TablesBasicComponent {
  public routes = routes;
}
