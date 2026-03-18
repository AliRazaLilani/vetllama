import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-patient-register-step3',
  templateUrl: './patient-register-step3.component.html',
  styleUrls: ['./patient-register-step3.component.scss'],
  imports: [RouterLink, FormsModule],
})
export class PatientRegisterStep3Component {
  public routes = routes;
  public cartValue = [0];
  public addPos(i: number): void {
    this.cartValue[i]++;
  }
  public reducePos(i: number): void {
    this.cartValue[i]--;
  }
}
