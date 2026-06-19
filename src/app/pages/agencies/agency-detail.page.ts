import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AgencyDetailComponent } from '../../modules/agencies/components/agency-detail.component';
import { Agency } from '../../modules/models';

@Component({
  selector: 'app-agency-detail-page',
  standalone: true,
  imports: [AgencyDetailComponent, RouterLink],
  templateUrl: './agency-detail.page.html'
})
export class AgencyDetailPage {
  private readonly route = inject(ActivatedRoute);
  readonly agency = this.route.snapshot.data['agency'] as Agency | undefined;
}
