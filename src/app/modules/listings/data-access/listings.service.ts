import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Signal, WritableSignal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Listing, ListingFilters } from '../../models';

@Injectable({ providedIn: 'root' })
export class ListingsService {
  private readonly http = inject(HttpClient);

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('data/listings.json');
  }

  getListingsByAgencyId(agencyId: number): Observable<Listing[]> {
    return this.getListings().pipe(map((listings) => listings.filter((listing) => listing.agencyId === agencyId)));
  }

  searchListings(filters: ListingFilters): Observable<Listing[]> {
    return this.getListings().pipe(
      map((listings) =>
        listings.filter((listing) => {
          const cityOk = !filters.city || listing.city.toLowerCase().includes(filters.city.toLowerCase());
          const typeOk = !filters.type || listing.type === filters.type;
          const minPriceOk = filters.minPrice === undefined || listing.price >= filters.minPrice;
          const maxPriceOk = filters.maxPrice === undefined || listing.price <= filters.maxPrice;
          return cityOk && typeOk && minPriceOk && maxPriceOk;
        })
      )
    );
  }

  getListingById(id: number): Observable<Listing | undefined> {
    return this.getListings().pipe(map((listings) => listings.find((listing) => listing.id === id)));
  }
}
