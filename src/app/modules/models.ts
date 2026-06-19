export type ListingKind = 'Maison' | 'Appartement' | 'Terrain';

export interface AgencyManager {
  name: string;
  role: string;
  avatar: string;
}

export interface Agency {
  id: number;
  name: string;
  city: string;
  description: string;
  image: string;
  manager: AgencyManager;
}

export interface Listing {
  id: number;
  title: string;
  city: string;
  address: string;
  type: ListingKind;
  price: number;
  surface: number;
  agencyId: number;
  image: string;
  imageDescription: string;
  description: string;
  rating: number;
}

export interface ListingFilters {
  city?: string;
  type?: ListingKind;
  minPrice?: number;
  maxPrice?: number;
}
