import { ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AgenciesService } from './modules/agencies/data-access/agencies.service';
import { ListingsService } from './modules/listings/data-access/listings.service';
import { HomePage } from './pages/home/home.page';
import { ListingsPage } from './pages/listings/listings.page';
import { AgenciesPage } from './pages/agencies/agencies.page';
import { AgencyDetailPage } from './pages/agencies/agency-detail.page';
import { AgencyAnnoncesPage } from './pages/agencies/agency-annonces.page';
import { ContactPage } from './pages/contact/contact.page';
import { SitemapPage } from './pages/sitemap/sitemap.page';
import { LegalPage } from './pages/legal/legal.page';
import { ListingEditPage } from './pages/listings/listing-edit.page';
import { ListingSeePage } from './pages/listings/listing-see.page';

const listingsResolver: ResolveFn<unknown> = () => inject(ListingsService).getListings();
const agenciesResolver: ResolveFn<unknown> = () => inject(AgenciesService).getAgencies();
const agencyResolver: ResolveFn<unknown> = (route) =>
	inject(AgenciesService).getAgencyById(Number(route.paramMap.get('id')));
const listingResolver: ResolveFn<unknown> = (route) =>
	inject(ListingsService).getListingById(Number(route.paramMap.get('id')));
const agencyListingsResolver: ResolveFn<unknown> = (route) =>
	inject(ListingsService).getListingsByAgencyId(Number(route.paramMap.get('id')));

export const routes: Routes = [
	{
		path: '',
		component: HomePage,
		resolve: {
			listings: listingsResolver,
			agencies: agenciesResolver
		},
		data: { breadcrumb: 'Accueil' }
	},
	{
		path: 'annonces/recherche',
		component: ListingsPage,
		resolve: { listings: listingsResolver },
		data: { breadcrumb: 'Recherche annonces' }
	},
	{
		path: 'annonces/recherche/edit/:id',
		component: ListingEditPage,
		data: { breadcrumb: 'Edition annonce' }
	},
	{
		path: 'annonces/recherche/see/:id',
		component: ListingSeePage,
		resolve: { listing: listingResolver },
		data: { breadcrumb: 'Voir annonce' }
	},
	{
		path: 'agences/recherche',
		component: AgenciesPage,
		resolve: { agencies: agenciesResolver },
		data: { breadcrumb: 'Agences' }
	},
	{
		path: 'agences/recherche/:id',
		component: AgencyDetailPage,
		resolve: { agency: agencyResolver },
		data: { breadcrumb: 'Detail agence' }
	},
	{
		path: 'agences/:id',
		component: AgencyDetailPage,
		resolve: { agency: agencyResolver },
		data: { breadcrumb: 'Detail agence' }
	},
	{
		path: 'agences/:id/annonces',
		component: AgencyAnnoncesPage,
		resolve: {
			agency: agencyResolver,
			listings: agencyListingsResolver
		},
		data: { breadcrumb: 'Annonces agence' }
	},
	{
		path: 'agences/:agencyId/annonces/:id',
		component: ListingSeePage,
		resolve: { listing: listingResolver },
		data: { breadcrumb: 'Voir annonce agence' }
	},
	{
		path: 'contact',
		component: ContactPage,
		data: { breadcrumb: 'Contact' }
	},
	{
		path: 'mentions-legales',
		component: LegalPage,
		data: { breadcrumb: 'Mentions legales' }
	},
	{
		path: 'plan-du-site',
		component: SitemapPage,
		data: { breadcrumb: 'Plan du site' }
	},
	{ path: '**', redirectTo: '' }
];
