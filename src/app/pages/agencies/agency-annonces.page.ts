import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListingsLayoutComponent } from '../../modules/listings/components/listings-layout.component';
import { createListingsViewModel } from '../../modules/listings/data-access/listings-view-model';
import { Agency, Listing } from '../../modules/models';

@Component({
  selector: 'app-agency-annonces-page',
  standalone: true,
  imports: [ListingsLayoutComponent, RouterLink],
  templateUrl: './agency-annonces.page.html'
})
export class AgencyAnnoncesPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly agency = this.route.snapshot.data['agency'] as Agency | undefined;
  private readonly sourceListings = signal<Listing[]>(this.route.snapshot.data['listings'] as Listing[]);

  readonly vm = createListingsViewModel({
    sourceListings: this.sourceListings,
    route: this.route,
    router: this.router
  });

  readonly seeLinkBuilder = (listingId: number): (string | number)[] => ['/agences', this.agency?.id ?? 0, 'annonces', listingId];
}
