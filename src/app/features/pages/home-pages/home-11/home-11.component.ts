import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { LightGalleryAllSettings } from 'lightgallery/lg-settings';
import { LightGallery } from 'lightgallery/lightgallery';
import { HomeHeaderComponent } from 'src/app/layouts/home-header/home-header.component';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-home-11',
  imports: [HomeHeaderComponent,LightgalleryModule,CommonModule,RouterLink],
  templateUrl: './home-11.component.html',
  styleUrl: './home-11.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home11Component {
routes =routes


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
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };




  ngOnInit(): void {
    document.body.classList.add('theme-10')

  }
  ngOnDestroy(): void {
    document.body.classList.remove('theme-10')
  }
}
