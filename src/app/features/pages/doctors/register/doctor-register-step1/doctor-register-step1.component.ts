import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-doctor-register-step1',
  templateUrl: './doctor-register-step1.component.html',
  styleUrls: ['./doctor-register-step1.component.scss'],
  imports: [FormsModule, RouterLink],
})
export class DoctorRegisterStep1Component {
  public routes = routes;
}
