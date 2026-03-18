import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
interface data {
  value: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [RouterLink, BsDatepickerModule],
})
export class ProfileComponent implements OnInit {
  public routes = routes;
  public selectedValue = '';
  date = new Date();
  myDateValue!: Date;

  selectedList: data[] = [
    { value: 'Choose Status' },
    { value: 'Complete' },
    { value: 'Inprogress' },
  ];
  ngOnInit() {
    this.myDateValue = new Date();
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }
}
