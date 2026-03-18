import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-speciality',
  imports: [RouterLink,CommonModule],
  templateUrl: './speciality.component.html',
  styleUrl: './speciality.component.scss'
})
export class SpecialityComponent {
 routes = routes;
}
