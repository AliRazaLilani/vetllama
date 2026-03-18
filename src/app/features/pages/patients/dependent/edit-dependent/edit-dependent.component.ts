import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-edit-dependent',
  templateUrl: './edit-dependent.component.html',
  styleUrls: ['./edit-dependent.component.scss'],
  imports: [],
})
export class EditDependentComponent {
  public routes = routes;
}
