import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.scss'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class PatientSidebarComponent {
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';

  constructor(private common: CommonService) {
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
}
