import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.scss'],
    imports: [CommonModule,RouterLink]
})
export class VideoCallComponent {
  
  public routes = routes;
  public micIcon = true;
  public videoIcon = true;
  elem=document.documentElement
  changeMicIcon() {
    this.micIcon = !this.micIcon;
  }
  changeVideoIcon() {
    this.videoIcon = !this.videoIcon;
  }
  fullscreen() {
    if(!document.fullscreenElement) {
      this.elem.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  }

}
