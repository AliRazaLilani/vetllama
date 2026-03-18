import { AfterViewInit, Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { LightgalleryModule } from 'lightgallery/angular';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { CountUpModule } from 'ngx-countup';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home-1',
  imports: [CarouselModule,RouterLink,MatSelectModule,LightgalleryModule,CountUpModule,CommonModule,FormsModule],
  templateUrl: './home-1.component.html',
  styleUrl: './home-1.component.scss',
})
export class Home1Component implements AfterViewInit {
  routes = routes;
  favourite:boolean[] =[false];
  toggleFavourite(i:number):void{
    this.favourite[i] = !this.favourite[i]
  }

  constructor(private router:Router) {
    
  }
  public spcialitySlider: OwlOptions = {
    loop: true,
    dots: false,
    nav: true,
    smartSpeed: 2000,
     navText: [
      '<i class="isax isax-arrow-left"></i>',
      '<i class="isax isax-arrow-right-1"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 6,
      },
      1200: {
        items: 8,
      },
    },
  };
    public doctorSlider: OwlOptions = {
    loop: true,
    margin: 24,
    dots: false,
    nav: false,
    smartSpeed: 2000,
    navText: [
      '<i class="isax isax-arrow-left"></i>',
      '<i class="isax isax-arrow-right-1"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      },
      1300: {
        items: 4,
      },
    },
  };
  public testimonialSlider: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };

  public companySliderOptions: OwlOptions = {
    loop: true,
      autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 6
      },
      1200: {
        items: 6
      },
      1400: {
        items: 6
      }
    }
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
    onInit = (detail: { instance: LightGallery }): void => {
      this.lightGallery = detail.instance;
    };
    navigate() {
    this.router.navigate([routes.search2]);
  }
}
