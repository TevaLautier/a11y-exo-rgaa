import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import type { LocaleOption } from 'echarts/types/src/core/locale.js';
import { BarChart } from 'echarts/charts';
import { AriaComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import frLocale from 'echarts/i18n/langFR.js';

import { routes } from './app.routes';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer, AriaComponent]);
echarts.registerLocale('FR', frLocale as LocaleOption);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    provideToastr(),
    provideEchartsCore({ echarts })
  ]
};
