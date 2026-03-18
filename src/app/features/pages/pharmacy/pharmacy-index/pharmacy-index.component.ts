import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/core/services/data/data.service';
import { partnersSlider } from 'src/app/core/models/models';

import { routes } from 'src/app/core/routes/routes';
import { FormsModule } from '@angular/forms';
import { PharmacyfooterComponent } from 'src/app/layouts/pharmacyfooter/pharmacyfooter.component';
import { PharmacyheaderComponent } from 'src/app/layouts/pharmacyheader/pharmacyheader.component';
@Component({
  selector: 'app-pharmacy-index',
  templateUrl: './pharmacy-index.component.html',
  styleUrls: ['./pharmacy-index.component.scss'],
  imports: [
    RouterLink,
    PharmacyfooterComponent,
    CarouselModule,
    FormsModule,
    PharmacyheaderComponent,
  ],
})
export class PharmacyIndexComponent implements OnInit {
  public routes = routes;
  public partnerSlider: partnersSlider[] = [];
  constructor(private data: DataService, private router: Router) {
    this.partnerSlider = this.data.partnerSlider;
  }
  public partnersSliderOption: OwlOptions = {
    loop: true,
    margin: 24,
    nav: false,
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
    },
  };
  quantity = 0;

  increaseQuantity() {
    this.quantity++;
  }
  decreaseQuantity() {
    this.quantity = Math.max(0, this.quantity - 1);
  }
  countSection1 = 10;
  countSection2 = 10;
  countSection3 = 10;
  countSection4 = 10;

  decreaseCount(section: number) {
    if (section === 1 && this.countSection1 > 0) {
      this.countSection1--;
    } else if (section === 2 && this.countSection2 > 0) {
      this.countSection2--;
    } else if (section === 3 && this.countSection3 > 0) {
      this.countSection3--;
    } else if (section === 4 && this.countSection4 > 0) {
      this.countSection4--;
    }
  }

  increaseCount(section: number) {
    if (section === 1) {
      this.countSection1++;
    } else if (section === 2) {
      this.countSection2++;
    } else if (section === 3) {
      this.countSection3++;
    } else if (section === 4) {
      this.countSection4++;
    }
  }
  public strokeValue = 0;
  public progress = 0;
  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  // function to calculate the scroll progress
  private calculateScrollPercentage(): void {
    window.addEventListener('scroll', () => {
      const body = document.body,
        html = document.documentElement;
      //gets the total height of page till scroll
      const totalheight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      // calculates the total stroke value
      this.progress = totalheight;
      const currentDistance = window.scrollY / (totalheight / 3000);
      // calculates the current stroke value
      this.strokeValue = totalheight - currentDistance / 8;
      // condition to hide scroll progress if page in top
      if (window.scrollY == 0) {
        this.strokeValue = totalheight;
      }
      // condition to make scroll progress to 100 if page in bottom
      if (window.innerHeight + window.scrollY >= totalheight) {
        this.strokeValue = 0;
      }
    });
  }
  ngOnInit(): void {
    this.calculateScrollPercentage();
  }
}
