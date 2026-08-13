import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
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
import { RegisterPage } from './pages/register/register.page';
import { ListingEditPage } from './pages/listings/listing-edit.page';
import { ListingSeePage } from './pages/listings/listing-see.page';

const listingsResolver: ResolveFn<unknown> = () => inject(ListingsService).getListings();
const agenciesResolver: ResolveFn<unknown> = () => inject(AgenciesService).getAgencies();
const agencyResolver: ResolveFn<unknown> = (route) =>
  inject(AgenciesService).getAgencyById(Number(route.paramMap.get('id')));
const annonceResolver: ResolveFn<unknown> = (route) =>
  inject(ListingsService).getListingById(Number(route.paramMap.get('id')));
const listingResolver: ResolveFn<unknown> = (route) =>
  inject(ListingsService).getListingById(Number(route.paramMap.get('id')));
const agencyByAgencyIdResolver: ResolveFn<unknown> = (route) =>
  inject(AgenciesService).getAgencyById(Number(route.paramMap.get('agencyId')));
const agencyListingsResolver: ResolveFn<unknown> = (route) =>
  inject(ListingsService).getListingsByAgencyId(Number(route.paramMap.get('id')));
export const SUFFIX_TITLE =
  'Mobilière - Annonces immobilières, agences et biens à vendre ou à louer';

const getResolvedAgencyName = (route: ActivatedRouteSnapshot, key = 'agency') =>
  route.parent?.data[key]?.name ?? 'Agence inconnue';

const getResolvedListingTitle = (route: ActivatedRouteSnapshot, key = 'listing') =>
  route.parent?.data[key]?.title ?? 'Annonce inconnue';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      listings: listingsResolver,
      agencies: agenciesResolver,
    },
    data: { breadcrumb: 'Accueil' },
    title: 'Accueil - ' + SUFFIX_TITLE,
  },
  {
    path: 'annonces/recherche',
    component: ListingsPage,
    resolve: { listings: listingsResolver },
    data: { breadcrumb: 'Recherche annonces' },
    title: "Recherche d'Annonces - " + SUFFIX_TITLE,
  },
  {
    path: 'annonces/recherche/edit/:id',
    resolve: {
      annonce: annonceResolver,
    },
    children: [
      {
        path: '',
        component: ListingEditPage,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) =>
            `Edition annonce ${route.parent!.data['annonce'].title}`,
        },
        title: (route: ActivatedRouteSnapshot) =>
          `Edition annonce ${route.parent!.data['annonce'].title} - ${SUFFIX_TITLE}`,
      },
    ],
  },
  {
    path: 'annonces/recherche/see/:id',
    resolve: {
      listing: listingResolver,
    },
    children: [
      {
        path: '',
        component: ListingSeePage,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) =>
            `Annonce ${getResolvedListingTitle(route)}`,
        },
        title: (route: ActivatedRouteSnapshot) =>
          `Annonce ${getResolvedListingTitle(route)} - ${SUFFIX_TITLE}`,
      },
    ],
  },
  {
    path: 'agences/recherche',
    component: AgenciesPage,
    resolve: { agencies: agenciesResolver },
    data: { breadcrumb: 'Agences' },
    title: 'Agences - ' + SUFFIX_TITLE,
  },
  {
    path: 'agences/recherche/:id',
    resolve: {
      agency: agencyResolver,
    },
    children: [
      {
        path: '',
        component: AgencyDetailPage,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) =>
            `Agence ${getResolvedAgencyName(route)}`,
        },
        title: (route: ActivatedRouteSnapshot) =>
          `Agence ${getResolvedAgencyName(route)} - ${SUFFIX_TITLE}`,
      },
    ],
  },
  {
    path: 'agences/:id',
    resolve: {
      agency: agencyResolver,
    },
    children: [
      {
        path: '',
        component: AgencyDetailPage,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) =>
            `Agence ${getResolvedAgencyName(route)}`,
        },
        title: (route: ActivatedRouteSnapshot) =>
          `Agence ${getResolvedAgencyName(route)} - ${SUFFIX_TITLE}`,
      },
    ],
  },
  {
    path: 'agences/:id/annonces',
    resolve: {
      agency: agencyResolver,
      listings: agencyListingsResolver,
    },
    children: [
      {
        path: '',
        component: AgencyAnnoncesPage,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) =>
            `Annonces de l'agence ${getResolvedAgencyName(route)}`,
        },
        title: (route: ActivatedRouteSnapshot) =>
          `Annonces de l'agence ${getResolvedAgencyName(route)} - ${SUFFIX_TITLE}`,
      },
    ],
  },
  {
    path: 'agences/:agencyId/annonces/:id',
    resolve: {
      agency: agencyByAgencyIdResolver,
      listing: listingResolver,
    },
    children: [
      {
        path: '',
        component: ListingSeePage,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) =>
            `Annonce ${getResolvedListingTitle(route)} de l'agence ${getResolvedAgencyName(route)}`,
        },
        title: (route: ActivatedRouteSnapshot) =>
          `Annonce ${getResolvedListingTitle(route)} de l'agence ${getResolvedAgencyName(route)} - ${SUFFIX_TITLE}`,
      },
    ],
  },
  {
    path: 'contact',
    component: ContactPage,
    data: { breadcrumb: 'Contact' },
    title: 'Contact - ' + SUFFIX_TITLE,
  },
  {
    path: 'mentions-legales',
    component: LegalPage,
    data: { breadcrumb: 'Mentions legales' },
    title: 'Mentions legales - ' + SUFFIX_TITLE,
  },
  {
    path: 'inscription',
    component: RegisterPage,
    data: { breadcrumb: "S'inscrire" },
  },
  {
    path: 'plan-du-site',
    component: SitemapPage,
    data: { breadcrumb: 'Plan du site' },
    title: 'Plan du site - ' + SUFFIX_TITLE,
  },
  { path: '**', redirectTo: '' },
];
