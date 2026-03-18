import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';
@Component({
  selector: 'app-doctor-pending-blog',
  templateUrl: './doctor-pending-blog.component.html',
  styleUrls: ['./doctor-pending-blog.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
  ],
})
export class DoctorPendingBlogComponent {
  public routes = routes;
}
