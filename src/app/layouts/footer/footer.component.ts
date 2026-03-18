import { Component } from '@angular/core';
import { CommonService } from '../../core/services/common/common.service';
import { routes } from '../../core/routes/routes';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [RouterLink],
})
export class FooterComponent {
  public routes = routes;
  base = '';
  page = '';
  constructor(private common: CommonService) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
  }
}
