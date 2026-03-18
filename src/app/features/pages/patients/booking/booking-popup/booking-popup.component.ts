import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  styleUrls: ['./booking-popup.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    MatSelectModule,
    BsDatepickerModule,
    FormsModule,
  ],
})
export class BookingPopupComponent {
  routes = routes;
  public selectedFieldSet = [0];
  bsInlineValue = new Date();
  isShow = true;
  isClinic = true;
  ngOnInit(): void {
    this.isShow = true;
  }
  ngOnDestroy(): void {
    this.isShow = false;
  }
  showClinic(): void {
    this.isClinic = true;
  }
  offClinic(): void {
    this.isClinic = false;
  }
}
