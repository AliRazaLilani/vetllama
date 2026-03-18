import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent, RouterModule } from '@angular/router';
import { url } from 'src/app/core/model/models';
import { routes } from 'src/app/core/routes/routes';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import * as Aos from 'aos';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
@Component({
  selector: 'app-pages',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {
  public routes = routes;
  public footerActive = false;
  public headerActive = false;
  public base = '';
  public page = '';
  public last = '';
  isMenuOpened = false;
  // Scroll to the top of the page
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 992) {
      document.body.style.overflow = ''
    }
  }
  constructor(
    private common: CommonService,
    private router: Router,
    private elementRef: ElementRef,
    private sidebar: SidebarService
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.getRoutes(event);
        this.scrollToTop();
        document.body.style.overflow = '';
      }
    });
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    this.getRoutes(this.router);
  }

  public getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    if (
      events.url.split('/')[1] === 'index' ||
      events.url.split('/')[1] === 'index-2' ||
      events.url.split('/')[1] === 'index-3' ||
      events.url.split('/')[1] === 'index-4' ||
      events.url.split('/')[1] === 'index-5' ||
      events.url.split('/')[1] === 'index-6' ||
      events.url.split('/')[1] === 'index-7' ||
      events.url.split('/')[1] === 'index-8' ||
      events.url.split('/')[1] === 'index-9' ||
      events.url.split('/')[1] === 'index-10' ||
      events.url.split('/')[1] === 'index-11' ||
      events.url.split('/')[1] === 'index-13' ||
      events.url.split('/')[1] === 'index-12'
    ) {
      this.footerActive = false;
      this.headerActive = false;
    } else {
      this.footerActive = true;
      this.headerActive = true;
    }
  }
  ngOnInit(): void {
    Aos.init({
      duration: 1500,
      once: true,
    });
  }
  @ViewChild('cursorOuter', { static: false }) cursorOuter!: ElementRef;
  @ViewChild('cursorInner', { static: false }) cursorInner!: ElementRef;

  private cursorInnerElement!: HTMLElement;
  private cursorOuterElement!: HTMLElement;

  ngAfterViewInit(): void {
    this.cursorInnerElement = this.cursorInner.nativeElement;
    this.cursorOuterElement = this.cursorOuter.nativeElement;
    this.initCursor();
  }

  private initCursor(): void {
    const body = document.body;

    body.addEventListener('mousemove', (event: MouseEvent) => {
      this.cursorOuterElement.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      this.cursorInnerElement.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });

    const cursorPointerElements =
      this.elementRef.nativeElement.querySelectorAll('a, .cursor-pointer');

    cursorPointerElements.forEach((element: HTMLElement) => {
      element.addEventListener('mouseenter', () => {
        this.cursorInnerElement.classList.add('cursor-hover');
        this.cursorOuterElement.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', () => {
        if (!(element.tagName === 'A' && element.closest('.cursor-pointer'))) {
          this.cursorInnerElement.classList.remove('cursor-hover');
          this.cursorOuterElement.classList.remove('cursor-hover');
        }
      });
    });

    this.cursorInnerElement.style.visibility = 'visible';
    this.cursorOuterElement.style.visibility = 'visible';
  }
}
