import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { LightGallery } from 'lightgallery/lightgallery';
import { CountUpModule } from 'ngx-countup';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightgalleryModule } from 'lightgallery/angular';
import { SwiperOptions } from 'swiper/types';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-home-7',
  imports: [CountUpModule, CarouselModule,LightgalleryModule,RouterLink],
  templateUrl: './home-7.component.html',
  styleUrl: './home-7.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home7Component {
  routes= routes
  @ViewChild('owl', { static: false })
  owl!: any;
  @ViewChild('testimonialSwiper', { static: false })
  swiperEl!: ElementRef<any>;
  public partnersSliderOption: OwlOptions = {
    loop: true,
    margin: 24,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      550: {
        items: 1,
      },
      700: {
        items: 4,
      },
      1000: {
        items: 6,
      },
      1200: {
        items: 6,
      },
      1400: {
        items: 6,
      },
    },
  };  
   activeIndex = 3;

  setActive(index: number): void {
    this.activeIndex = index;
  }
  goPrev(): void {
    this.swiperEl?.nativeElement?.swiper?.slidePrev();
  }
  goNext(): void {
    this.swiperEl?.nativeElement?.swiper?.slideNext();
  }
  public testimonialSliderOption: OwlOptions = {
    loop: true,
    margin: 24,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 2000,
    responsive: {
      0: {
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
  };

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
    settings = {
      counter: false,
      plugins: [lgZoom, lgVideo],
    };
   private lightGallery!: LightGallery;
    private needRefresh = false;
    ngAfterViewChecked(): void {
      if (this.needRefresh) {
        this.lightGallery.refresh();
        this.needRefresh = false;
      }
      
    }
      onInit = (detail: { instance: LightGallery }): void => {
      this.lightGallery = detail.instance;
    };
  ngOnInit():void{
    document.body.classList.add('theme-6')
  }
  ngOnDestroy():void{
    document.body.classList.remove('theme-6')
  }
}
