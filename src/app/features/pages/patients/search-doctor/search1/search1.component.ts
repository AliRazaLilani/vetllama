import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { routes } from 'src/app/core/routes/routes';
import { BreadcrumbSearchComponent } from '../../common/breadcrumb-search/breadcrumb-search.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-search1',
  templateUrl: './search1.component.html',
  styleUrls: ['./search1.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatSliderModule,
    BreadcrumbSearchComponent,
    LightgalleryModule,
    MatSelectModule,
  ],
})
export class Search1Component implements OnInit {
  public routes = routes;
  isfilter = false;
  myDateValue!: Date;
  date = new Date();
  settings = {
    counter: false,
    plugins: [lgZoom],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
  ngOnInit() {
    this.myDateValue = new Date();
  }

  onDateChange(newDate: Date) {
    // console.log(newDate);
  }
  filterOpen(): void {
    this.isfilter = !this.isfilter;
  }
}
