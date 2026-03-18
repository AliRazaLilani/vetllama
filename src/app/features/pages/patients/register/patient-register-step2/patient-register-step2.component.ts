import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-patient-register-step2',
  templateUrl: './patient-register-step2.component.html',
  styleUrls: ['./patient-register-step2.component.scss'],
  imports: [RouterLink, FormsModule],
})
export class PatientRegisterStep2Component {
  public routes = routes;
  displayStyle = 'none';
  selectedOption = 'Male';

  toggleDisplay() {
    this.displayStyle = this.displayStyle === 'none' ? 'block' : 'none';
  }
}
