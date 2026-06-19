import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbService } from '../data-access/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb2.component.html',
  styleUrl: './breadcrumb2.component.scss'
})
export class Breadcrumb2Component {
  private readonly route = inject(ActivatedRoute);
  private readonly breadcrumbService = inject(BreadcrumbService);

  readonly links = this.breadcrumbService.buildFromRoute(this.route.snapshot);
}
