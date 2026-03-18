import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss'],
  imports: [RouterLink, BsDatepickerModule],
})
export class AddPurchaseComponent implements OnInit {
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
