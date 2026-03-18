import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-voice-call',
    templateUrl: './voice-call.component.html',
    styleUrls: ['./voice-call.component.scss'],
    imports: [CommonModule,RouterLink]
})
export class VoiceCallComponent {
  public routes = routes;
  public videoIcon = true;
  public micIcon = true;
  changeMicIcon() {
    this.micIcon = !this.micIcon;
  }
  changeVideoIcon() {
    this.videoIcon = !this.videoIcon;
  }

}
