import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-pharmacy-register-step3',
  templateUrl: './pharmacy-register-step3.component.html',
  styleUrls: ['./pharmacy-register-step3.component.scss'],
  imports: [RouterLink],
})
export class PharmacyRegisterStep3Component {
  public routes = routes;
  displayStyle = 'none';

  toggleDisplay() {
    this.displayStyle = this.displayStyle === 'none' ? 'block' : 'none';
    // console.log('aaa', this.displayStyle);
  }
}
