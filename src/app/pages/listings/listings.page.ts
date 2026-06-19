import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsLayoutComponent } from '../../modules/listings/components/listings-layout.component';
import { Listing } from '../../modules/models';
import { createListingsViewModel } from '../../modules/listings/data-access/listings-view-model';

@Component({
  selector: 'app-listings-page',
  standalone: true,
  imports: [ListingsLayoutComponent],
  templateUrl: './listings.page.html'
})
export class ListingsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly sourceListings = signal<Listing[]>(this.route.snapshot.data['listings'] as Listing[]);

  readonly vm = createListingsViewModel({
    sourceListings: this.sourceListings,
    route: this.route,
    router: this.router
  });
}
