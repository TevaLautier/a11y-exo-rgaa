import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListingDetailComponent } from '../../modules/listings/components/listing-detail.component';
import { Listing } from '../../modules/models';

@Component({
  selector: 'app-listing-see-page',
  standalone: true,
  imports: [ListingDetailComponent, RouterLink],
  templateUrl: './listing-see.page.html'
})
export class ListingSeePage {
  private readonly route = inject(ActivatedRoute);
  readonly listing = this.route.snapshot.data['listing'] as Listing | undefined;

  readonly backLink = this.route.snapshot.paramMap.get('agencyId')
    ? ['/agences', this.route.snapshot.paramMap.get('agencyId'), 'annonces']
    : ['/annonces/recherche'];
}
