import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Listing } from '../../models';
import { AtomicChartComponent, AtomicInputTextComponent, AtomicPaginationComponent, AtomicTableComponent, AtomicButtonIconComponent } from '@so-ui';

@Component({
  selector: 'app-listings-layout',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    CurrencyPipe,
    AtomicChartComponent,
    AtomicInputTextComponent,
    AtomicPaginationComponent,
    AtomicTableComponent,
    AtomicButtonIconComponent
],
  templateUrl: './listings-layout.component.html',
  styleUrl: './listings-layout.component.scss'
})
export class ListingsLayoutComponent {
  readonly tableHeaders = [
    { key: 'title', label: 'Titre' },
    { key: 'city', label: 'Ville' },
    { key: 'price', label: 'Prix' },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  readonly listings = input.required<Listing[]>();
  readonly city = input<string>('');
  readonly selectedType = input<string>('');
  readonly chartOptions = input.required<Record<string, unknown>>();
  readonly chartRows = input.required<{ label: string; value: number }[]>();
  readonly sortColumn = input<string>('');
  readonly sortDirection = input<'asc' | 'desc' | ''>('');
  readonly editLinkBuilder = input<(listingId: number) => (string | number)[]>((listingId) => ['/annonces/recherche/edit', listingId]);
  readonly seeLinkBuilder = input<(listingId: number) => (string | number)[]>((listingId) => ['/annonces/recherche/see', listingId]);

  readonly cityChange = output<string>();
  readonly typeChange = output<string>();
  readonly sortChange = output<string>();
  readonly selectPrice = output<string>();

  readonly tableRows = computed(() => this.listings().map((listing) => ({ ...listing, actions: '' })));
}
