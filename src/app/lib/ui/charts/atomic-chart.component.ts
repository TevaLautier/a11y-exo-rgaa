import { Component, input, output } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'atomic-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './atomic-chart.component.html',
  styleUrl: './atomic-chart.component.scss'
})
export class AtomicChartComponent {
  readonly options = input.required<Record<string, unknown>>();
  readonly chartClick = output<{ name: string }>();
}
