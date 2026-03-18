import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.scss'],
  imports: [RouterLink, BsDatepickerModule],
})
export class EditPurchaseComponent implements OnInit {
  public routes = routes;
  date = new Date();
  myDateValue!: Date;
  ngOnInit() {
    this.myDateValue = new Date();
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
}
