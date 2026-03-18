import { Component, ViewChild } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CountUpModule } from 'ngx-countup';
import { LightgalleryModule } from 'lightgallery/angular';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { HomeHeaderComponent } from 'src/app/layouts/home-header/home-header.component';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-home-8',
  imports: [CarouselModule, CountUpModule, LightgalleryModule, HomeHeaderComponent,RouterLink],
  templateUrl: './home-8.component.html',
  styleUrl: './home-8.component.scss',
})
export class Home8Component {
  routes = routes
  @ViewChild('owl', { static: false })
  owl!: any;
  @ViewChild('owl2', { static: false })
  owl2!: any;
  goNext(): void {
    this.owl.next();
  }
  goPrev(): void {
    this.owl.prev();
  }
  goNext2(): void {
    this.owl2.next();
  }
  goPrev2(): void {
    this.owl2.prev();
  }
  public ourSliderOptions: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    center: true,
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
        items: 3,
      },
      1200: {
        items: 3.5,
      },
      1400: {
        items: 3.5,
      },
    },
  };
  public companySliderOption: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
         autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
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
  public blogSliderOption: OwlOptions = {
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
        items: 1,
      },
      1000: {
        items: 2,
      },
      1200: {
        items: 2,
      },
      1400: {
        items: 2,
      },
    },
  };
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
    document.body.classList.add('theme-7')
  }
  ngOnDestroy(): void {
    document.body.classList.remove('theme-7')
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
}
