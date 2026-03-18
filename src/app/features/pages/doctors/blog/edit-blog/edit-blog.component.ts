import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../../common/doctor-breadcrumb/doctor-breadcrumb.component';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    DoctorSidebarComponent,
    DoctorBreadcrumbComponent,
  ],
})
export class EditBlogComponent {
  public routes = routes;
  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.doctorBlog]);
  }
}
