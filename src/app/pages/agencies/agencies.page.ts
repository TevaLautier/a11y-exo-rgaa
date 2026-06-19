import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgenceGridComponent } from '../../modules/agencies/components/agence-grid.component';
import { Agency } from '../../modules/models';

@Component({
  selector: 'app-agencies-page',
  standalone: true,
  imports: [AgenceGridComponent],
  templateUrl: './agencies.page.html'
})
export class AgenciesPage {
  private readonly route = inject(ActivatedRoute);
  readonly agencies = this.route.snapshot.data['agencies'] as Agency[];
}
