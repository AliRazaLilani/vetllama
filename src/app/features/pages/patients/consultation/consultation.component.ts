import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class ConsultationComponent {
  public routes = routes;
  activeTabIndex = 0;

  activateTab(index: number) {
    this.activeTabIndex = index;
  }

  isTabActive(index: number) {
    return this.activeTabIndex === index;
  }
}
