import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-home-13',
  imports: [RouterModule,CarouselModule,CountUpModule,CommonModule],
  templateUrl: './home-13.component.html',
  styleUrl: './home-13.component.scss',
})
export class Home13Component {
routes =routes
  isFixed = false;
    @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add a fixed class when the scroll position is greater than 50px
    this.isFixed = window.pageYOffset > 50;
  }
    public dealsSliderOption: OwlOptions = {
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
    public testimonial1: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 2000,
    center:false,
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
        items: 3,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 3,
      },
    },
  }
    public testimonial2: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 2000,
    center:false,
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
        items: 3,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 3,
      },
    },
  }
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
    days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  countdownExpired = false;
  email = '';

  private countdownInterval: ReturnType<typeof setInterval> | undefined;



  private setCountdown(): void {
   const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const STORAGE_KEY = 'countdownStart';

  let startTime = localStorage.getItem(STORAGE_KEY)
    ? Number(localStorage.getItem(STORAGE_KEY))
    : Date.now();

  // Save start time if new
  localStorage.setItem(STORAGE_KEY, startTime.toString());

  this.countdownInterval = setInterval(() => {
    const now = Date.now();
    let distance = THIRTY_DAYS - (now - startTime);

    if (distance <= 0) {
      // 🔁 Restart cycle
      startTime = Date.now();
      localStorage.setItem(STORAGE_KEY, startTime.toString());
      distance = THIRTY_DAYS;
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

  }, 1000);
  }
  ngOnInit(): void {
    document.body.classList.add('theme-12')
        this.setCountdown();
  }
  ngOnDestroy(): void {
    document.body.classList.remove('theme-12')
    clearInterval(this.countdownInterval);
  }
}
