import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-patient-register-step5',
  templateUrl: './patient-register-step5.component.html',
  styleUrls: ['./patient-register-step5.component.scss'],
  imports: [RouterLink],
})
export class PatientRegisterStep5Component {
  public routes = routes;
}
