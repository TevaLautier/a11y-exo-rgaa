import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export interface SkipLink {
  target: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class SkipLinksService implements OnDestroy {
  private readonly router = inject(Router);

  private readonly _skipLinks = signal<SkipLink[]>([
    { target: 'so-main', label: 'Aller au contenu principal' },
    { target: 'so-footer', label: 'Aller au pied de page' }
  ]);

  readonly skipLinks = this._skipLinks.asReadonly();

  private readonly subscription: Subscription;

  constructor() {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.reset());
  }

  addSkipLink(target: string, label: string): void {
    this._skipLinks.update((links) => {
      if (links.some((link) => link.target === target)) {
        return links;
      }
      return [...links, { target, label }];
    });
  }

  private reset(): void {
    this._skipLinks.set([
      { target: 'so-main', label: 'Aller au contenu principal' },
      { target: 'so-footer', label: 'Aller au pied de page' }
    ]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
