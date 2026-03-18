import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, CarouselModule,RouterLink],
})
export class ChatComponent {
  public routes = routes;
  public chat = false;

  showChat() {
    this.chat = !this.chat;
  }
  public onlineList: OwlOptions = {
    margin: 0,
    nav: false,
    loop: false,
    dots: false,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 5,
      },
      768: {
        items: 5,
      },
      1170: {
        items: 5,
      },
    },
  };
  ngOnInit():void{
    document.body.classList.add('main-chat-blk')
  }
  ngOnDestroy():void{
    document.body.classList.remove('main-chat-blk')
  }
}
