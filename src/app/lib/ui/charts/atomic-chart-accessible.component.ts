import { Component, input, output } from '@angular/core';
import { AtomicChartComponent } from './atomic-chart.component';

@Component({
  selector: 'atomic-chart-accessible',
  standalone: true,
  imports: [AtomicChartComponent],
  templateUrl: './atomic-chart-accessible.component.html',
  styleUrl: './atomic-chart-accessible.component.scss'
})
export class AtomicChartAccessibleComponent {
  readonly options = input.required<Record<string, unknown>>();
  readonly rows = input.required<{ label: string; value: number }[]>();
  readonly selectPrice = output<string>();
}
