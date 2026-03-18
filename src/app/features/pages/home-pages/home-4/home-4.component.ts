import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CountUpModule } from 'ngx-countup';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DatePickerModule } from 'primeng/datepicker';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightgalleryModule } from 'lightgallery/angular';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-home-4',
  imports: [CarouselModule,CountUpModule,MatSelectModule,BsDatepickerModule,DatePickerModule,FormsModule,LightgalleryModule,RouterLink],
  templateUrl: './home-4.component.html',
  styleUrl: './home-4.component.scss',
})
export class Home4Component implements AfterViewInit{
  routes= routes
   @ViewChild('videoSection', { static: true })
  videoSection!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {

    gsap.fromTo(
      this.videoSection.nativeElement,
      { width: '80%' },         
      {
        width: '100%',           
        ease: 'none',            
        scrollTrigger: {
          trigger: this.videoSection.nativeElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5             
        }
      }
    );
  }
  time =new Date();
    public professionalSlider: OwlOptions = {
    loop: true,
    dots: false,
    nav: true,
    margin:12,
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
        items: 3,
      },
      992: {
        items: 3,
      },
    },
  };
    public testimonialSlider: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    center:true,
    margin:12,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 1.5,
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
        items: 3
      },
      500: {
        items: 3
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
  public strokeValue = 0;
  public progress = 0;
  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }


ngOnInit():void{
  document.body.classList.add('theme-3')
}
ngOnDestroy():void{
  document.body.classList.remove('theme-3')
}
}
