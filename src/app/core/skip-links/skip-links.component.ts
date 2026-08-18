import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SkipLinksService } from './skip-links.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-skip-links',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './skip-links.component.html',
  styleUrl: './skip-links.component.scss',
})
export class SkipLinksComponent {
  private readonly skipLinksService = inject(SkipLinksService);

  readonly skipLinks = this.skipLinksService.skipLinks;
  private router = inject(Router);

  // Signal qui se met à jour à chaque navigation
  private navigationEnd = toSignal(
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)),
    { initialValue: null },
  );

  currentUrlSegment = computed(() => {
    // dépendance au signal de navigation pour forcer le recalcul
    this.navigationEnd();
    return this.router.url.split('#')[0].split('?')[0];
  });
}
