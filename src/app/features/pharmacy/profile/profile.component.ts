import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [RouterModule, BsDatepickerModule],
})
export class ProfileComponent implements OnInit {
  public routes = routes;
  myDateValue!: Date;
  date = new Date();
  ngOnInit() {
    this.myDateValue = new Date();
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }
}
