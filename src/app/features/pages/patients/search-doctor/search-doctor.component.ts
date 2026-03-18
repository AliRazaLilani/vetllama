import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.scss'],
  imports: [RouterModule],
})
export class SearchDoctorComponent {
  public routes = routes;
}
