import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-add-dependent',
  templateUrl: './add-dependent.component.html',
  styleUrls: ['./add-dependent.component.scss'],
  imports: [],
})
export class AddDependentComponent {
  public routes = routes;
}
