import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../../models';

export interface ListingsViewModel {
  city: WritableSignal<string>;
  selectedType: WritableSignal<string>;
  selectedPriceBucket: WritableSignal<string>;
  sortColumn: WritableSignal<string>;
  sortDirection: WritableSignal<'asc' | 'desc' | ''>;
  listings: Signal<Listing[]>;
  chartRows: Signal<{ label: string; value: number }[]>;
  chartOptions: Signal<Record<string, unknown>>;
  onCityChange(value: string): void;
  onTypeChange(value: string): void;
  onChartSelect(value: string): void;
  onSortChange(column: string): void;
}

export function createListingsViewModel(params: {
  sourceListings: Signal<Listing[]>;
  route: ActivatedRoute;
  router: Router;
}): ListingsViewModel {
  const city = signal(params.route.snapshot.queryParamMap.get('city') ?? '');
  const selectedType = signal(params.route.snapshot.queryParamMap.get('type') ?? '');
  const selectedPriceBucket = signal(params.route.snapshot.queryParamMap.get('bucket') ?? '');
  const sortColumn = signal('');
  const sortDirection = signal<'asc' | 'desc' | ''>('');

  const listings = computed(() => {
    let result = params.sourceListings();

    if (city()) {
      result = result.filter((item) => item.city.toLowerCase().includes(city().toLowerCase()));
    }

    if (selectedType()) {
      result = result.filter((item) => item.type === selectedType());
    }

    if (selectedPriceBucket()) {
      const [min, max] = selectedPriceBucket().split('-').map((value) => Number.parseInt(value, 10));
      result = result.filter((item) => item.price >= min && item.price <= max);
    }

    if (!sortColumn() || !sortDirection()) {
      return result;
    }

    const direction = sortDirection() === 'asc' ? 1 : -1;
    return [...result].sort((a, b) => {
      const aValue = a[sortColumn() as keyof Listing];
      const bValue = b[sortColumn() as keyof Listing];
      if (aValue < bValue) {
        return -1 * direction;
      }
      if (aValue > bValue) {
        return 1 * direction;
      }
      return 0;
    });
  });

  const chartRows = computed(() => [
    { label: '0-150000', value: params.sourceListings().filter((item) => item.price <= 150000).length },
    { label: '150001-300000', value: params.sourceListings().filter((item) => item.price > 150000 && item.price <= 300000).length },
    { label: '300001-1000000', value: params.sourceListings().filter((item) => item.price > 300000).length }
  ]);

  const chartOptions = computed(() => ({
    xAxis: { type: 'category', data: chartRows().map((item) => item.label) },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: chartRows().map((item) => item.value), itemStyle: { color: '#ff9100' } }]
  }));

  const updateQueryParams = (): void => {
    params.router.navigate([], {
      relativeTo: params.route,
      queryParams: {
        city: city() || null,
        type: selectedType() || null,
        bucket: selectedPriceBucket() || null
      },
      queryParamsHandling: 'merge'
    });
  };

  return {
    city,
    selectedType,
    selectedPriceBucket,
    sortColumn,
    sortDirection,
    listings,
    chartRows,
    chartOptions,
    onCityChange(value: string): void {
      city.set(value);
      updateQueryParams();
    },
    onTypeChange(value: string): void {
      selectedType.set(value);
      updateQueryParams();
    },
    onChartSelect(value: string): void {
      selectedPriceBucket.set(value);
      updateQueryParams();
    },
    onSortChange(column: string): void {
      if (sortColumn() !== column) {
        sortColumn.set(column);
        sortDirection.set('asc');
        return;
      }

      if (sortDirection() === 'asc') {
        sortDirection.set('desc');
        return;
      }

      if (sortDirection() === 'desc') {
        sortDirection.set('');
        sortColumn.set('');
        return;
      }

      sortDirection.set('asc');
    }
  };
}
