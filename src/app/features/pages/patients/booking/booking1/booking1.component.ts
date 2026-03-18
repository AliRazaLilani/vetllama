import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/app/core/services/common/common.service';
import { routes } from 'src/app/core/routes/routes';
import { PatientBreadcrumbComponent } from '../../common/patient-breadcrumb/patient-breadcrumb.component';
@Component({
  selector: 'app-booking1',
  templateUrl: './booking1.component.html',
  styleUrls: ['./booking1.component.scss'],
  imports: [
    RouterLink,
    BsDatepickerModule,
    FormsModule,
    PatientBreadcrumbComponent,
  ],
})
export class Booking1Component implements OnDestroy {
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(private common: CommonService, private renderer: Renderer2) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    if (this.last == 'booking1') {
      this.renderer.addClass(document.body, 'date-pickers');
    }
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'date-pickers');
  }
}
