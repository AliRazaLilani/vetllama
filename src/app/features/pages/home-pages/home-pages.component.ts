import { Component } from '@angular/core';
import { NavigationStart, Router, RouterEvent, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { HomeHeaderComponent } from 'src/app/layouts/home-header/home-header.component';

@Component({
  selector: 'app-home-pages',
  imports: [HomeHeaderComponent,RouterModule],
  templateUrl: './home-pages.component.html',
  styleUrl: './home-pages.component.scss',
})
export class HomePagesComponent {
  base = '';
  page = '';
  last = '';
  constructor(
    private common: CommonService,
    private router: Router,
  ) {
   
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
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
