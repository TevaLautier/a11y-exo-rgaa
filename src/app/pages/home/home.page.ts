import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeLayoutComponent } from '../../modules/home/components/home-layout.component';
import { Agency, Listing } from '../../modules/models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeLayoutComponent],
  templateUrl: './home.page.html'
})
export class HomePage {
  private readonly route = inject(ActivatedRoute);

  private readonly listingsData = this.route.snapshot.data['listings'] as Listing[];
  private readonly agenciesData = this.route.snapshot.data['agencies'] as Agency[];

  readonly featuredListings = computed(() => this.listingsData.slice(0, 12));
  readonly agencies = computed(() => this.agenciesData);
}
