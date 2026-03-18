import { Component } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-home-6',
  imports: [LightgalleryModule,RouterLink],
  templateUrl: './home-6.component.html',
  styleUrl: './home-6.component.scss',
})
export class Home6Component {
  routes = routes
     activeIndex = 1;

  setActive(index: number): void {
    this.activeIndex = index;
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
  ngOnInit():void{
    document.body.classList.add('theme-5')
  }
  ngOnDestroy():void{
    document.body.classList.remove('theme-5')
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
}
