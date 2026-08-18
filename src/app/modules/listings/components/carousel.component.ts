import { Component, computed, input, OnDestroy, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Listing } from '../../models';
import { RouterLink } from "@angular/router";

const WINDOW_SIZE = 4;
const STEP = 3;
const INTERVAL_MS = 3000;

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnDestroy {
  readonly listings = input.required<Listing[]>();

  readonly startIndex = signal(0);
  readonly paused = signal(false);

  readonly visibleListings = computed(() => {
    const all = this.listings();
    const count = all.length;
    if (count === 0) return [];
    const start = this.startIndex();
    const result: Listing[] = [];
    for (let i = 0; i < WINDOW_SIZE; i++) {
      result.push(all[(start + i) % count]);
    }
    return result;
  });

  private readonly timer = setInterval(() => {
    if (!this.paused()) this.next();
  }, INTERVAL_MS);

  next(): void {
    const count = this.listings().length;
    if (count === 0) return;
    this.startIndex.set((this.startIndex() + STEP) % count);
  }

  previous(): void {
    const count = this.listings().length;
    if (count === 0) return;
    this.startIndex.set((this.startIndex() - STEP + count) % count);
  }

  togglePause(): void {
    this.paused.update(p => !p);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
