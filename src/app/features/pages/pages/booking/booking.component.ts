import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-booking',
  imports: [CommonModule,RouterLink,MatSelectModule,BsDatepickerModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  routes=routes;
  public selectedFieldSet = [0];
  bsInlineValue = new Date();
  isClinic=true;
  showClinic():void{
    this.isClinic=true;
  }
  offClinic():void{
    this.isClinic=false;
  }
}
