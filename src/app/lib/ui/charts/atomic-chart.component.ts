import { Component, input, output } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import frLocale from 'echarts/i18n/langFR.js';
import { LocaleOption } from 'echarts/types/src/core/locale.js';
import { AtomicButtonIconComponent } from "@so-ui/buttons";

echarts.registerLocale('FR', frLocale as LocaleOption);

@Component({
  selector: 'atomic-chart',
  standalone: true,
  imports: [NgxEchartsDirective, AtomicButtonIconComponent],
  templateUrl: './atomic-chart.component.html',
  styleUrl: './atomic-chart.component.scss',
})
export class AtomicChartComponent {
  readonly caption=input.required<string>();
  readonly initOpts = { locale: 'FR' };
  readonly options = input.required<Record<string, unknown>>();
  readonly rows = input.required<{ label: string; value: number }[]>();
  readonly selectPrice = output<string>();

  chartClick(event: any) {
    if (event.name) {
      this.selectPrice.emit(event.name);
    }
  }
}
