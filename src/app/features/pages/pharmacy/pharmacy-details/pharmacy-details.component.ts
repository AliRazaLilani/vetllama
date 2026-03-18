import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

import { RouterLink } from '@angular/router';
import { LightgalleryModule } from 'lightgallery/angular';
@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.scss'],
  imports: [RouterLink, LightgalleryModule],
})
export class PharmacyDetailsComponent {
  public routes = routes;
  settings = {
    counter: false,
    plugins: [lgZoom],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
}
