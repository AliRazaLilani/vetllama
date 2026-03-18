import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {gsap} from 'gsap';
import { register as registerSwiper } from 'swiper/element';
registerSwiper();
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection(),
    BsDatepickerModule.forRoot().providers!,
    provideAnimations(),
    provideHttpClient(),
    provideNgxMask({
          showMaskTyped: false,
      }),
      NgCircleProgressModule.forRoot({
        radius: 70,
        space: -10,
        outerStrokeGradient: true,
        outerStrokeWidth: 10,
        outerStrokeColor: '#4882c2',
        outerStrokeGradientStopColor: '#65A30D',
        innerStrokeColor: '#65A30D',
        innerStrokeWidth: 10,
        animateTitle: false,
        animationDuration: 1000,
        showUnits: false,
        showBackground: false,
        clockwise: false,
        startFromZero: false,
        showSubtitle: false,
        showTitle: false,
      }).providers!,
  ],

};
