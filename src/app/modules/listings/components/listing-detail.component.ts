import { Component, inject, input } from '@angular/core';
import { Listing } from '../../models';
import { CommonModule } from '@angular/common';
import { AtomicMapCityComponent } from '../../../lib/ui/atomic-map-city';
import { HttpClientModule } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';
import { AgenciesService } from '../../agencies/data-access/agencies.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [CommonModule, AtomicMapCityComponent, HttpClientModule, RouterLink],
  templateUrl: './listing-detail.component.html',
  styleUrl: './listing-detail.component.scss',
})
export class ListingDetailComponent {
  private readonly agenciesService = inject(AgenciesService);

  readonly listing = input.required<Listing | undefined>();

  readonly agency$ = toObservable(this.listing).pipe(
    map((listing) => listing?.agencyId),
    switchMap((agencyId) =>
      agencyId === undefined ? of(undefined) : this.agenciesService.getAgencyById(agencyId)
    )
  );
}
