import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-hospitals',
  imports: [RouterLink,CommonModule,MatSelectModule],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.scss'
})
export class HospitalsComponent {
routes = routes
currentStep = 1

changeContent(res:number) {
    this.currentStep = res
}

}
