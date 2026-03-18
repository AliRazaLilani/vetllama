import { AfterViewInit, Component } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { gsap } from 'gsap';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-home-2',
  imports: [LightgalleryModule,CarouselModule,RouterLink],
  templateUrl: './home-2.component.html',
  styleUrl: './home-2.component.scss',
})
export class Home2Component implements AfterViewInit {
  routes = routes
  private mouseStopTimer: any;
  private readonly HIDE_DELAY = 400;

  private interactionArea?: HTMLElement | any;
  private trailImages?: NodeListOf<HTMLElement> | any;
  public testimonialSlider: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
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
     if (typeof gsap === 'undefined') {
      return;
    }
    this.trailImages = document.querySelectorAll<HTMLElement>('.content-img');
    this.interactionArea = document.querySelector<HTMLElement>('.trail-content');
    if (!this.interactionArea || !this.trailImages.length) return;
    const hideTrail = () => {
      gsap.to(this.trailImages, {
        opacity: 0,
        duration: 0.5,
        stagger: 0.05
      });
    };
    const showTrail = () => {
      gsap.to(this.trailImages, {
        opacity: 1,
        duration: 0.1
      });
    };
    const onMouseMove = (e: MouseEvent) => {
      clearTimeout(this.mouseStopTimer);
      showTrail();

      gsap.to(this.trailImages, {
        x: e.clientX,
        y: e.clientY,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      this.mouseStopTimer = setTimeout(hideTrail, this.HIDE_DELAY);
    };
    const onMouseLeave = () => hideTrail();
    const onMouseEnter = () => showTrail();

    this.interactionArea.addEventListener('mousemove', onMouseMove);
    this.interactionArea.addEventListener('mouseleave', onMouseLeave);
    this.interactionArea.addEventListener('mouseenter', onMouseEnter);

    hideTrail();

    // store refs for cleanup
    this.cleanup = () => {
      this.interactionArea?.removeEventListener('mousemove', onMouseMove);
      this.interactionArea?.removeEventListener('mouseleave', onMouseLeave);
      this.interactionArea?.removeEventListener('mouseenter', onMouseEnter);
    };
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
    private cleanup?: () => void;
  ngOnInit():void{
    document.body.classList.add('theme-1')
  }
  ngOnDestroy():void{
     this.cleanup?.();
    clearTimeout(this.mouseStopTimer);
    document.body.classList.remove('theme-1')
  }

}
