import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LightgalleryModule } from 'lightgallery/angular';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';
@Component({
  selector: 'app-home-5',
  imports: [CommonModule, RouterLink, CarouselModule, LightgalleryModule,BsDatepickerModule,DatePicker,FormsModule,CountUpModule],
  templateUrl: './home-5.component.html',
  styleUrl: './home-5.component.scss',
})
export class Home5Component {
  public routes = routes;
   time: Date[] | undefined;
@ViewChild('owl', { static: false })
owl!: any;

@ViewChild('owl2', { static: false })
owl2!: any;
  goNext(): void {
  this.owl.next();
}
  goNext2(): void {
  this.owl2.next();
}

goPrev(): void {
  this.owl.prev();
}
goPrev2(): void {
  this.owl2.prev();
}
  public bannerSlider: OwlOptions = {
    loop: true,
    autoplay: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    smartSpeed: 2000,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 1
      },
      1200: {
        items: 1
      },
      1400: {
        items: 1
      }
    }
  };
  public testimonialSlider: OwlOptions = {
    loop: true,
    autoplay: false,
    dots: false,
    nav: false,
     responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      },
      1400: {
        items: 2
      }
    }
  };
  public companySlider: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: false,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 3
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
    onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
  ngOnInit():void{
    document.body.classList.add('theme-4')
  }
  ngOnDestroy():void{
    document.body.classList.remove('theme-4')
  }

}
