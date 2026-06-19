import { Component, computed, input } from '@angular/core';
import { Agency } from '../../models';
import { AtomicMapCityComponent } from '../../../lib/ui/atomic-map-city';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-agency-detail',
  standalone: true,
  imports: [AtomicMapCityComponent, HttpClientModule],
  templateUrl: './agency-detail.component.html',
  styleUrl: './agency-detail.component.scss',
})
export class AgencyDetailComponent {
  readonly agency = input.required<Agency | undefined>();
  readonly responsable = computed(() => this.agency()?.manager);
}

