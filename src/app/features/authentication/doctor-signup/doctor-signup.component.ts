import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import intlTelInput from 'intl-tel-input';
@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.scss'],
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
})
export class DoctorSignupComponent {
  public togglePasswordClass = false;
  public selectedFieldSet = [0];
  public routes = routes;

  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  togglePassword() {
    this.togglePasswordClass = !this.togglePasswordClass;
  }
  ngAfterViewInit(): void {
    const input = document.querySelector('#phone') as HTMLInputElement;
    const input2 = document.querySelector('#phone2') as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: 'us',
      preferredCountries: ['us', 'gb', 'in'],
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
    } as any);
    intlTelInput(input2, {
      initialCountry: 'us',
      preferredCountries: ['us', 'gb', 'in'],
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
    } as any);
    // Restrict input to numbers, "+", and allowed characters
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9+()-\s]/g, ''); // Removes any character not allowed
    });
    input2.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9+()-\s]/g, ''); // Removes any character not allowed
    });
  }
}
