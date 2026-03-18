import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-clinic',
  imports: [RouterLink,CommonModule,MatSelectModule],
  templateUrl: './clinic.component.html',
  styleUrl: './clinic.component.scss'
})
export class ClinicComponent {
routes = routes
}
