import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightgalleryModule } from 'lightgallery/angular';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-home-12',
  imports: [CarouselModule, LightgalleryModule,CommonModule,RouterLink],
  templateUrl: './home-12.component.html',
  styleUrl: './home-12.component.scss',
})
export class Home12Component {
  routes=routes
    @ViewChild('owl', { static: false })
    owl!: any;
      goNext(): void {
    this.owl.next();
  }
  goPrev(): void {
    this.owl.prev();
  }
  public servicesTwelveSliderOption: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 2000,
    center:true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      768: {
        items: 2,
        center:false,
      },
      992: {
        items: 3.5,
      },
      1000: {
        items: 3.5,
      },
      1200: {
        items: 3.5,
      },
      1400: {
        items: 3.5,
      },
    },
  }
  public teamSliderOption: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 4,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 4,
      },
    },
  }
  public testimonialsSliderOption: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    center: true,
    margin: 24,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
         center:false,
      },
      500: {
        items: 1,
         center:false,
      },
      768: {
        items: 1,
        center:false,
        loop: false,
      },
      1000: {
        items: 1.3,
      },
      1200: {
        items: 1.3,
      },
      1400: {
        items: 1.3,
      },
    },
  }
    @ViewChild('thumbSwiper', { static: false })
    thumbSwiper!: ElementRef;
   images = [
      'assets/img/patients/patient24.jpg',
      'assets/img/patients/patient26.jpg',
      'assets/img/patients/patient21.jpg',
      'assets/img/patients/patient25.jpg',
      'assets/img/patients/patient27.jpg'
    ];
  
    centerIndex = Math.floor(this.images.length / 2);
  
    mainactiveSlider = 0;
    get activeSlider(): number {
      return this.centerIndex;
    }
  
    toggleSlider(clickedIndex: number): void {
      this.mainactiveSlider=clickedIndex;
      if (clickedIndex === this.centerIndex) return;
  
      const clickedItem = this.images.splice(clickedIndex, 1)[0];
  
      // insert clicked image into center
      this.images.splice(this.centerIndex, 0, clickedItem);
     
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
    document.body.classList.add('theme-11')
  }
  ngOnDestroy(): void {
    document.body.classList.remove('theme-11')
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
}
