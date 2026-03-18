import { Component, ElementRef, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/routes/routes';
import { Swiper } from 'swiper/types';
@Component({
  selector: 'app-home-10',
  imports: [CountUpModule, CarouselModule,RouterLink],
  templateUrl: './home-10.component.html',
  styleUrl: './home-10.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home10Component {
routes=routes
  
  public partnerSliderOption: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 5,
      },
      1200: {
        items: 5,
      },
      1400: {
        items: 5,
      },
    },
  }
  public testimonialSliderOption: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 1,
      },
      1200: {
        items: 1,
      },
      1400: {
        items: 1,
      },
    },
  }
  
  ngAfterViewInit(): void {
    document.querySelectorAll('.animate-button').forEach(btn => {
      const text = btn.getAttribute('data-text');
      const container = btn.querySelector('.button-text');

      if (!text || !container) return;

      container.innerHTML = '';

      const chars = text.split('');
      const total = chars.length;
      const angle = 360 / total;

      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.setProperty('--index', i.toString());
        span.style.setProperty('--angle', angle.toString());

        container.appendChild(span);
      });
    });
  }
  ngOnInit(): void {
    document.body.classList.add('theme-9')
  }
  ngOnDestroy(): void {
    document.body.classList.remove('theme-9')
  }
}
