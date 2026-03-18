import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-patient-register-step4',
  templateUrl: './patient-register-step4.component.html',
  styleUrls: ['./patient-register-step4.component.scss'],
  imports: [RouterLink],
})
export class PatientRegisterStep4Component {
  public routes = routes;
}
