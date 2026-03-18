import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/routes/routes';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightgalleryModule } from 'lightgallery/angular';
import { SplitterModule } from 'primeng/splitter';
import { HomeHeaderComponent } from 'src/app/layouts/home-header/home-header.component';
@Component({
  selector: 'app-home-3',
  imports: [CommonModule, RouterLink, CarouselModule, LightgalleryModule,SplitterModule,HomeHeaderComponent],
  templateUrl: './home-3.component.html',
  styleUrl: './home-3.component.scss',
})
export class Home3Component {
  public routes = routes;
 private active = false;

  private scroller!: HTMLElement;
  private wrapper!: HTMLElement;
  private after!: HTMLElement;

  private onMouseMove!: (e: MouseEvent) => void;
  private onMouseUp!: () => void;
  private onMouseLeave!: () => void;
  private onTouchMove!: (e: TouchEvent) => void;
  private onTouchEnd!: () => void;
  private onTouchCancel!: () => void;
  public categoriesSliderOption: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 2
      },
      1200: {
        items: 4
      },
      1400: {
        items: 4
      }
    }
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
        items: 6
      },
      768: {
        items: 6
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
    this.scroller = document.querySelector('.scroller') as HTMLElement;
    this.wrapper  = document.querySelector('.wrapper') as HTMLElement;
    this.after    = document.querySelector('.after') as HTMLElement;

    if (!this.scroller || !this.wrapper || !this.after) {
      console.warn(
        'Init aborted: .scroller, .wrapper or .after element not found.'
      );
      return;
    }

    /* ---------------- MOUSE ---------------- */

    this.scroller.addEventListener('mousedown', () => {
      this.active = true;
      this.scroller.classList.add('scrolling');
    });

    this.onMouseUp = () => {
      this.active = false;
      this.scroller.classList.remove('scrolling');
    };

    this.onMouseLeave = () => {
      this.active = false;
      this.scroller.classList.remove('scrolling');
    };

    this.onMouseMove = (e: MouseEvent) => {
      if (!this.active) return;
      this.scrollIt(e.pageX);
    };

    document.body.addEventListener('mouseup', this.onMouseUp);
    document.body.addEventListener('mouseleave', this.onMouseLeave);
    document.body.addEventListener('mousemove', this.onMouseMove);

    /* ---------------- TOUCH ---------------- */

    this.scroller.addEventListener('touchstart', () => {
      this.active = true;
      this.scroller.classList.add('scrolling');
    });

    this.onTouchEnd = () => {
      this.active = false;
      this.scroller.classList.remove('scrolling');
    };

    this.onTouchCancel = () => {
      this.active = false;
      this.scroller.classList.remove('scrolling');
    };

    this.onTouchMove = (e: TouchEvent) => {
      if (!this.active) return;
      const t = e.touches?.[0];
      if (!t) return;
      this.scrollIt(t.pageX);
    };

    document.body.addEventListener('touchend', this.onTouchEnd);
    document.body.addEventListener('touchcancel', this.onTouchCancel);
    document.body.addEventListener('touchmove', this.onTouchMove, {
      passive: true
    });

    // initial position
    const centerX =
  this.wrapper.getBoundingClientRect().left +
  this.wrapper.offsetWidth / 2;

this.scrollIt(centerX);
  }
  private scrollIt(x: number): void {
    const rect = this.wrapper.getBoundingClientRect();
    const relativeX = x - rect.left;

    const transform = Math.max(
      0,
      Math.min(relativeX, this.wrapper.offsetWidth)
    );

    this.after.style.width = `${transform}px`;
    this.scroller.style.left = `${transform - 25}px`; // original offset
  }
  ngOnInit():void{
    document.body.classList.add('theme-2')
  }
  ngOnDestroy():void{
    document.body.classList.remove('theme-2')
     document.body.removeEventListener('mouseup', this.onMouseUp);
    document.body.removeEventListener('mouseleave', this.onMouseLeave);
    document.body.removeEventListener('mousemove', this.onMouseMove);

    document.body.removeEventListener('touchend', this.onTouchEnd);
    document.body.removeEventListener('touchcancel', this.onTouchCancel);
    document.body.removeEventListener('touchmove', this.onTouchMove);
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
}
